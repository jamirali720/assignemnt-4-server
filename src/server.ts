import mongoose from "mongoose";
import configs from "./app/configs";
import app from "./app";
import { Server } from "http";

let server: Server;

const databaseConnection = async () => {
  try {
    await mongoose.connect(configs.databaseUrl as string);
    console.log("Database connected successfully");

    server = app.listen(configs.port, () => {
      console.log(`Assignment-4 server is running on port ${configs.port}`);
    });
  } catch (error) {
    console.error("database connection failed");
  }
};
databaseConnection();

process.on("uncaughtException", () => {
  console.log("uncaughtException is detected. Server shutting down..");
  process.exit(1);
});

process.on("unhandledRejection", () => {
  console.log("unhandledRejection is detected. Server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
