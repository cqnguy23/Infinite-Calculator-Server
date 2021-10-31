import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import indexRouter from "./api/index.js";
import cors from "cors";
import env from "dotenv";
env.config();
const app = express();
const MONGOOSE_URI = process.env.DATABASE_URI || "";
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.connect(MONGOOSE_URI, (error) => {
  if (error) {
    console.log({ error });
  } else {
    console.log("Mongoose connected");
  }
});
app.use("/api", indexRouter);

export default app;
