import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.get("/", (req, res) => {
  res.send("helloword");
});

app.listen(3003, () => console.log("serrover running"));
