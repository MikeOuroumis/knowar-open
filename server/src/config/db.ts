import mongoose from "mongoose";
import { MONGO_URL } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
    console.log("💿 Connected to the database");
  } catch (err) {
    console.error("Couldn't connect to the database", err);
    process.exit(1);
  }
};

export default connectDB;
