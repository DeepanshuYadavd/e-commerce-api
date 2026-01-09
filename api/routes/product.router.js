import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

export default router;
