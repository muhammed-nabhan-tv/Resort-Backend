import { Router } from "express";
import { register, verifyOtp, resendOtp } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { registerSchema, verifyOtpSchema, resendOtpSchema } from "./auth.validation";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user & trigger 6-digit OTP verification email
 * @access  Public
 */
router.post("/register", validate(registerSchema), register);

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify 6-digit OTP code, activate account, and return auth JWT tokens
 * @access  Public
 */
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);

/**
 * @route   POST /api/auth/resend-otp
 * @desc    Resend a new 6-digit OTP code to an unverified email
 * @access  Public
 */
router.post("/resend-otp", validate(resendOtpSchema), resendOtp);

export default router;
