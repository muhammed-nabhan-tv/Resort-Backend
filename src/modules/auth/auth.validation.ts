import { z } from "zod";
import { USER_ROLES, type UserRole } from "../../models/user.model";

export const registerSchema = z.object({
    name: z
        .string({ message: "Name is required" })
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name must not exceed 50 characters"),
    email: z
        .string({ message: "Email is required" })
        .trim()
        .email("Please provide a valid email address")
        .toLowerCase(),
    password: z
        .string({ message: "Password is required" })
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password cannot exceed 100 characters"),
    phone: z
        .string()
        .trim()
        .regex(/^[0-9+\s\-()]{7,20}$/, "Invalid phone number format")
        .optional()
        .nullable(),
    role: z
        .enum(USER_ROLES, {
            message: `Role must be one of: ${USER_ROLES.join(", ")}`,
        })
        .optional()
        .default("CUSTOMER"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
