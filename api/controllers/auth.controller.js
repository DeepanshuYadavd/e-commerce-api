import { Auth } from "../models/auth.schema.js";
import { comparePassword, hashedPassword } from "../../utils/hashedPassword.js";

import { genToken } from "../../utils/authToken.js";
import jwt from "jsonwebtoken";

export const signupController = async (req, res, next) => {
  try {
    const { email, userName, password, role } = req.body;
    if (!email || !userName || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isUserExist = await Auth.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }
    const hashed = await hashedPassword(password);

    const user = await Auth.create({
      email,
      userName,
      password: hashed,
      role,
    });

    const token = await genToken(user._id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "user created successfully",
      user: user._id,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isEmailExist = await Auth.findOne({ email });
    if (!isEmailExist) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    const isPassword = await comparePassword(password, isEmailExist.password);
    if (isPassword) {
      const token = await genToken(isEmailExist._id, isEmailExist.role);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Login sucessfully",
        data: {
          id: isEmailExist._id,
          name: isEmailExist.userName,
          address: isEmailExist.addresses,
        },
      });
    } else {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "No token, Unauthorized",
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await Auth.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "No User Found",
      });
    }

    return res.status(200).json({
      data: user.userName,
      address: user.addresses,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const logoutController = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: true,
    });
    return res.status(200).json({
      message: "Logged Out Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
