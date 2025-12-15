import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./api/routes/auth.router.js";
import productRouter from "./api/routes/product.router.js";
import cartRouter from "./api/routes/cart.router.js";
import addressRouter from "./api/routes/address.router.js";
import orderRouter from "./api/routes/order.router.js";
const app = express();

// config:
dotenv.config();

//  middleware:
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://gadget-dukan.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  routes:

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

export default app;
