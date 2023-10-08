import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const UserDetailsSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
  },

  { collection: "RegisteredUsers" }
);

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("💿Connected to the database"))
  .catch((err) => console.log("Couldn't connect to the database", err));

mongoose.model("RegisteredUsers", UserDetailsSchema);
