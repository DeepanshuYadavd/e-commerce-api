import jwt from "jsonwebtoken";
import { Auth } from "../models/auth.schema.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = await Auth.findById(decode.id).select("-password");

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export const onlyAdmin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        message: "access denied",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};

export const onlyUser = (req, res, next) => {
  try {
    if (req.user.role) {
      next();
    } else {
      return res.status(401).json({
        message: "access denied",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};
