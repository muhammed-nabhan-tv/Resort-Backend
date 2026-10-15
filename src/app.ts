import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import resortRoutes from "./modules/resorts/resorts.routes";
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
// Global 404 handler for unknown routes
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Resource not found",
    });
});

// Global error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    if (process.env.NODE_ENV !== "production") {
        console.error("Error occurred:", err);
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
});

export default app;
