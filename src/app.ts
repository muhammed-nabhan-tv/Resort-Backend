
import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes";
import resortRoutes from "./modules/resorts/resorts.routes";
import { notFoundMiddleware } from "./middleware/notFound.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

// Standard middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Resort Booking API is running",
    });
});

// Module routes
app.use("/api/auth", authRoutes);


app.use("/api/resorts", resortRoutes);

// Handle requests to unknown routes
app.use(notFoundMiddleware);

// Centralized error handling — must be last
app.use(errorMiddleware);


export default app;
