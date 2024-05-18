import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import { JWT_SECRET } from "../config/config";

const jwtSecret = JWT_SECRET as string;

interface UserInterface {
  id: string;
  email: string;
  password: string;
}

interface CreateUserInput {
  userName: string;
  email: string;
  password: string;
}

export const createUser = async ({
  userName,
  email,
  password,
}: CreateUserInput) => {
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
  return User.findOne({ email });
};

export const validatePassword = async (
  password: string,
  user: UserInterface
) => {
  return bcrypt.compare(password, user.password);
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

export const deleteUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  await User.deleteOne({ _id: userId });
  return { message: "User deleted successfully" };
};
