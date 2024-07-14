import dotenv from "dotenv";
import path from "path";

dotenv.config();

console.log(dotenv.config());
export default {
  port: process.env.PORT,
  databaseUrl: process.env.MONGODB_DATABASE_PRODUCTION_URL, 
  NODE_ENV: process.env.NODE_ENV,
  adminEmail: process.env.ADMIN_EMAIL, 
};
