
import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();

app.use(express.json());


app.use(cors());


app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Resort Booking API is running",
    });
});


app.get("/api/health/db", async (_req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.status(200).json({
            success: true,
            message: "Database connection successful",
        });
    } catch (error) {
        console.error("Database health check failed:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
});


export default app;
