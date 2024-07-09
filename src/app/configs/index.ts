import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  databaseUrl: process.env.MONGODB_DATABASE_PRODUCTION_URL, 
  NODE_ENV: process.env.NODE_ENV,
  adminEmail: process.env.ADMIN_EMAIL, 
};
