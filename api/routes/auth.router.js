import {
  loginController,
  signupController,
} from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", loginController);

export default router;
