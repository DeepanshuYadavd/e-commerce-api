import {
  getMyProfile,
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", loginController);
router.get("/profile", getMyProfile);
router.get("/logOut", logoutController);

export default router;
