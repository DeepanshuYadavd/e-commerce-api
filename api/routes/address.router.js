import express from "express";
import {
  createAddress,
  deletAddress,
  getAllAddress,
  getSelectedAddress,
  setAsDefault,
  updateAddress,
} from "../controllers/addresses.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllAddress);
router.post("/", protect, createAddress);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deletAddress);
router.put("/default/:id", protect, setAsDefault);
router.get("/selected", protect, getSelectedAddress);

export default router;
