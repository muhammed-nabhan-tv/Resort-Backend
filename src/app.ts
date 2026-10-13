
import express from "express";
import cors from "cors";


const app = express();

app.use(express.json());


app.use(cors());


app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Resort Booking API is running",
    });
});



export default app;
