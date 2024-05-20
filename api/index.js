import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { globalErrorHandler } from "./controllers/error.controller.js";
import cookieParser from "cookie-parser";
// import admin from "firebase-admin";
// import serviceAccount from "../serviceAccountKey.cjs" assert { type: "json" }; // Use assert { type: 'json' }

dotenv.config();

// Initialize Firebase Admin SDK
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("helloword");
});

app.use(globalErrorHandler);

app.listen(3003, () => console.log("serrover running"));
