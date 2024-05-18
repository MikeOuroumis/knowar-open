import mongoose from "mongoose";
import { MONGO_URL } from "../config/config";

const UserDetailsSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
  },

  { collection: "RegisteredUsers" }
);

mongoose
  .connect(MONGO_URL as string)
  .then(() => console.log("💿Connected to the database"))
  .catch((err) => console.log("Couldn't connect to the database", err));

mongoose.model("RegisteredUsers", UserDetailsSchema);
