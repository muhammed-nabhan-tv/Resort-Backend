import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment");
}

export const connectDB = async (): Promise<void> => {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
};

export { mongoose };
