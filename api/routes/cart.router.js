import express from "express";
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCartItems);
router.put("/update", protect, updateCartItem);
router.delete("/delete/:productId", protect, deleteCartItem);

export default router;
