import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to database");
  } catch (err) {
    console.log("Error to connected with database", err);
  }
};
