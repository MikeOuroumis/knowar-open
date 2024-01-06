import { Request, Response } from "express";
import * as UserService from "../services/userService";
import { validateEmail } from "../utils/emailValidation";

interface UserRequestBody {
  userName: string;
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  const { userName, email, password }: UserRequestBody = req.body;

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid email format" });
  }

  try {
    const oldUser = await UserService.findUserByEmail(email);

    if (oldUser) {
      return res
        .status(409)
        .json({ status: "error", message: "Email is already registered" });
    }

    const newUser = await UserService.createUser(userName, email, password);

    const token = UserService.generateToken(newUser);

    return res.status(201).json({
      status: "ok",
      message: "Registration successful",
      token: token,
      email: email,
      userName: userName,
      userId: newUser.id,
    });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const isValidPassword = await UserService.validatePassword(password, user);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }

    const token = UserService.generateToken(user);

    return res.json({
      status: "ok",
      data: {
        token,
        email: user.email,
        userName: user.userName,
        userId: user._id,
      },
    });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

export const userData = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const user = await UserService.getUserDataFromToken(token);

    res.send({
      status: "ok",
      data: {
        email: user.email,
        userName: user.userName,
        userId: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    await UserService.deleteUser(userId);

    res.send({
      status: "ok",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
