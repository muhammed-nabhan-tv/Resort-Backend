import { Router } from "express";
import { register } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { registerSchema } from "./auth.validation";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user and generate access & refresh JWT tokens
 * @access  Public
 */
router.post("/register", validate(registerSchema), register);

export default router;
