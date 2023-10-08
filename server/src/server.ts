import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
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
