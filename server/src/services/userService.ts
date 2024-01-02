import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import { JWT_SECRET } from "../constants/variables";

const jwtSecret = JWT_SECRET as string;

interface UserInterface {
  id: string;
  email: string;
  password: string;
}

export const createUser = async (
  userName: string,
  email: string,
  password: string
) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    userName,
    email,
    password: encryptedPassword,
  });
  return newUser;
};

export const generateToken = (user: UserInterface) => {
  return jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
    expiresIn: "1h",
  });
};

export const findUserByEmail = async (email: string) => {
  const oldUser = await User.findOne({ email });

  return oldUser;
};

export const validatePassword = async (
  password: string,
  user: UserInterface
) => {
  const isValid = await bcrypt.compare(password, user.password);
  return isValid;
};

export const getUserDataFromToken = async (token: string) => {
  const decodedToken = jwt.verify(token, jwtSecret) as {
    userId: string;
    email: string;
  };

  const user = await User.findOne({ email: decodedToken.email });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
