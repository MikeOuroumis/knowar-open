import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import { initializeSocket } from "./socket/socket";

// Check NODE_ENV and load corresponding .env file
if (!process.env.NODE_ENV) {
  console.error("FATAL ERROR: NODE_ENV is not set.");
  process.exit(1); // Exit if NODE_ENV is not set
}

const dotenvResult =
  process.env.NODE_ENV === "production"
    ? dotenv.config({ path: "../.env.production" })
    : dotenv.config({ path: "../.env.development" });

// Log any errors from dotenv
if (dotenvResult.error) {
  console.error("dotenv error", dotenvResult.error);
  process.exit(1); // Exit if there is an error loading .env file
}

// Check for JWT_SECRET
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  process.exit(1); // Exit if JWT_SECRET is not set
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(roomRoutes);

// Health check route
app.get("/", (req, res) => res.status(200).send("OK"));

const server = app.listen(5000, () => {
  console.log("Server running on port 5000");
});

initializeSocket(server);
