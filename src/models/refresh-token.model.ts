import { Schema, model, type InferSchemaType } from "mongoose";

const refreshTokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        tokenHash: {
            type: String,
            required: true,
            unique: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        revokedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
);

// MongoDB automatically removes documents once `expiresAt` is reached.
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type RefreshTokenDoc = InferSchemaType<typeof refreshTokenSchema>;

export const RefreshToken = model("RefreshToken", refreshTokenSchema);
