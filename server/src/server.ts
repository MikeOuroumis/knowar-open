import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
}

// Check for JWT_SECRET
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  process.exit(1); // Exit the application with a failure code
}

import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import { initializeSocket } from "./socket/socket";

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(roomRoutes);

const server = app.listen(5000, () => {
  console.log("Server running on port 5000");
});

initializeSocket(server);
