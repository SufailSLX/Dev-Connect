import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({
      user: { id: user._id, email: user.email },
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      user: { id: user._id, email: user.email },
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
