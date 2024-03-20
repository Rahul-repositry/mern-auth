import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { globalErrorHandler } from "./controllers/error.controller.js";
dotenv.config();

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("helloword");
});

app.use(globalErrorHandler);

app.listen(3003, () => console.log("serrover running"));
