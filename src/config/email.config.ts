import dotenv from "dotenv";
dotenv.config();

import nodemailer, { type Transporter } from "nodemailer";

export const getEmailUser = (): string | undefined => process.env.EMAIL_USER?.trim();
export const getEmailPass = (): string | undefined => process.env.EMAIL_PASS?.trim();
export const getEmailHost = (): string => process.env.EMAIL_HOST?.trim() || "smtp.gmail.com";
export const getEmailPort = (): number => Number(process.env.EMAIL_PORT) || 465;

export const getEmailFrom = (): string => {
    const user = getEmailUser();
    return process.env.EMAIL_FROM?.trim() || (user ? `"StayUp Stays" <${user}>` : '"StayUp Stays" <noreply@stayupresorts.com>');
};

export const isEmailConfigured = (): boolean => {
    const user = getEmailUser();
    const pass = getEmailPass();
    return Boolean(user && pass && user.length > 3 && pass.length > 5);
};

let transporterInstance: Transporter | null = null;

export const getTransporter = (): Transporter => {
    const user = getEmailUser();
    const pass = getEmailPass();
    const host = getEmailHost();
    const port = getEmailPort();

    // Recreate transporter if credentials changed or not yet initialized
    if (!transporterInstance) {
        transporterInstance = nodemailer.createTransport({
            host,
            port,
            secure: port === 465, // true for port 465, false for 587
            auth: {
                user,
                pass,
            },
        });
    }

    return transporterInstance;
};
