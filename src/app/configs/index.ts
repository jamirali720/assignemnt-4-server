import dotenv from "dotenv";


dotenv.config();


export default {
  port: process.env.PORT,
  databaseUrl: process.env.MONGODB_DATABASE_PRODUCTION_URL,
  NODE_ENV: process.env.NODE_ENV,
  adminEmail: process.env.ADMIN_EMAIL,
  stripePublishableKey: process.env.STRIPE_API_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  smtpPasswordOne: process.env.SMTP_PASSWORD_ONE,
  smtpPasswordTwo: process.env.SMTP_PASSWORD_two,
};
