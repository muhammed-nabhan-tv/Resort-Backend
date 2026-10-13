
import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Resort Booking API running on port ${PORT}`);
        });
    } catch {
        console.error(
            "Server startup failed because MongoDB could not connect"
        );
        process.exit(1);
    }
};

startServer();
