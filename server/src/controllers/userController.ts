import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users";

const JWT_SECRET = process.env.JWT_SECRET;

interface UserRequestBody {
  userName: string;
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  const { userName, email, password }: UserRequestBody = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(409)
        .json({ status: "error", message: "Email is already registered" });
    }

    const newUser = await User.create({
      userName,
      email,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "your-secret-key", // Replace with your actual secret key
      { expiresIn: "1h" } // Set the token expiration time as needed
    );

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

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    if (!JWT_SECRET) {
      return res
        .status(500)
        .send({ status: "error", error: "JWT_SECRET is not defined." });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({
        status: "ok",
        data: {
          token: token,
          email: user.email,
          userName: user.userName,
          userId: user._id,
        },
      });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
};

export const userData = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!JWT_SECRET) {
    return res
      .status(500)
      .send({ status: "error", error: "JWT_SECRET is not defined." });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;

    User.findOne({ email: userEmail }).then((data) => {
      res.send({
        status: "ok",
        data: {
          email: data.email,
          userName: data.userName,
          userId: data._id,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
