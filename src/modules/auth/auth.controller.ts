import type { Request, Response, NextFunction } from "express";
import { registerUser } from "./auth.service";
import { AppError } from "../../utils/errors";
import type { RegisterInput } from "./auth.validation";

/**
 * Handles user registration request
 * POST /api/auth/register
 */
export const register = async (
    req: Request<{}, {}, RegisterInput>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const result = await registerUser(req.body);

        // Optional: Store refresh token in secure HTTP-only cookie for web browsers
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("refreshToken", result.tokens.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: result.user,
                accessToken: result.tokens.accessToken,
                refreshToken: result.tokens.refreshToken,
            },
        });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
            return;
        }

        next(error);
    }
};
