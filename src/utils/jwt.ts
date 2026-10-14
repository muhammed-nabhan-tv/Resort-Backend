import crypto from "crypto";
import jwt, { type SignOptions } from "jsonwebtoken";

export interface TokenUserPayload {
    userId: string;
    email: string;
    role: string;
}

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "resort_default_access_secret_key_change_in_prod";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "resort_default_refresh_secret_key_change_in_prod";
const ACCESS_TOKEN_EXPIRY = (process.env.JWT_ACCESS_EXPIRES_IN || "15m") as SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRY = (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

/**
 * Generates short-lived Access Token
 */
export const generateAccessToken = (payload: TokenUserPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
};

/**
 * Generates longer-lived Refresh Token
 */
export const generateRefreshToken = (payload: TokenUserPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
};

/**
 * Verifies and decodes an Access Token
 */
export const verifyAccessToken = (token: string): TokenUserPayload => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenUserPayload;
};

/**
 * Verifies and decodes a Refresh Token
 */
export const verifyRefreshToken = (token: string): TokenUserPayload => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenUserPayload;
};

/**
 * Computes a SHA-256 hash of a token for secure database storage
 */
export const hashToken = (token: string): string => {
    return crypto.createHash("sha256").update(token).digest("hex");
};

/**
 * Calculates expiry Date object based on REFRESH_TOKEN_EXPIRY string (e.g. '7d', '24h', '60m')
 */
export const calculateRefreshTokenExpiryDate = (): Date => {
    const expiryStr = (process.env.JWT_REFRESH_EXPIRES_IN || "7d").toString();
    const now = Date.now();

    const unit = expiryStr.slice(-1);
    const amount = parseInt(expiryStr.slice(0, -1), 10);

    let msToAdd = 7 * 24 * 60 * 60 * 1000; // default 7 days

    if (!isNaN(amount)) {
        switch (unit) {
            case "s":
                msToAdd = amount * 1000;
                break;
            case "m":
                msToAdd = amount * 60 * 1000;
                break;
            case "h":
                msToAdd = amount * 60 * 60 * 1000;
                break;
            case "d":
                msToAdd = amount * 24 * 60 * 60 * 1000;
                break;
            default:
                break;
        }
    }

    return new Date(now + msToAdd);
};
