import { Auth } from "../models/auth.schema.js";
import { comparePassword, hashedPassword } from "../../utils/hashedPassword.js";

import { genToken } from "../../utils/authToken.js";

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
      sameSite: "none",
      secure: false,
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
        sameSite: "none",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Login sucessfully",
        data: isEmailExist._id,
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
