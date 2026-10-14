import { User } from "../../models/user.model";
import { RefreshToken } from "../../models/refresh-token.model";
import { hashPassword } from "../../utils/password";
import {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
    calculateRefreshTokenExpiryDate,
} from "../../utils/jwt";
import { AppError } from "../../utils/errors";
import type { RegisterInput } from "./auth.validation";

export interface RegisterResult {
    user: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        role: string;
        createdAt: Date;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

/**
 * Registers a new user, hashes password, creates refresh token session, and generates JWTs
 */
export const registerUser = async (input: RegisterInput): Promise<RegisterResult> => {
    const normalizedEmail = input.email.toLowerCase().trim();

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
        throw new AppError("User with this email already exists", 409);
    }

    // 2. Hash plaintext password
    const passwordHash = await hashPassword(input.password);

    // 3. Create and persist user
    const newUser = await User.create({
        name: input.name.trim(),
        email: normalizedEmail,
        passwordHash,
        phone: input.phone?.trim() || null,
        role: input.role || "CUSTOMER",
    });

    // 4. Generate Access and Refresh JWTs
    const tokenPayload = {
        userId: newUser._id.toString(),
        email: newUser.email,
        role: newUser.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // 5. Store SHA-256 hash of refresh token for security & session tracking
    const tokenHash = hashToken(refreshToken);
    const expiresAt = calculateRefreshTokenExpiryDate();

    await RefreshToken.create({
        userId: newUser._id,
        tokenHash,
        expiresAt,
    });

    // 6. Return sanitized user profile and tokens
    return {
        user: {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone ?? null,
            role: newUser.role,
            createdAt: (newUser as unknown as { createdAt: Date }).createdAt,
        },
        tokens: {
            accessToken,
            refreshToken,
        },
    };
};
