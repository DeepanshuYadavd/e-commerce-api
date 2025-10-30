import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./api/routes/auth.router.js";
const app = express();

// config:
dotenv.config();

//  middleware:
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["get", "post", "put", "delete", "patch"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  routes:

app.use("/api/auth", authRouter);

export default app;
