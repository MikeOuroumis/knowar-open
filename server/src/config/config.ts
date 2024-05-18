import dotenv from "dotenv";

// Determine which .env file to load based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "production"
    ? "/home/ubuntu/.env.production"
    : "../.env.development";

// Load the .env file
dotenv.config({ path: envFile });

// Export environment variables
export const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";
export const JWT_SECRET = process.env.JWT_SECRET || "your-default-jwt-secret";
export const LOCALHOST_URL = "http://localhost";

// Add validation here if needed
if (!MONGO_URL) {
  console.error("FATAL ERROR: MONGO_URL is not defined.");
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  process.exit(1);
}
