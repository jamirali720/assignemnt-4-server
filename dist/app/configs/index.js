"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    databaseUrl: process.env.MONGODB_DATABASE_PRODUCTION_URL,
    NODE_ENV: process.env.NODE_ENV,
    adminEmail: process.env.ADMIN_EMAIL,
    stripePublishableKey: process.env.STRIPE_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    smtpPasswordOne: process.env.SMTP_PASSWORD_ONE,
    smtpPasswordTwo: process.env.SMTP_PASSWORD_two,
};
