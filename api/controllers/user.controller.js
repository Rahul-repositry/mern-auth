import { AsyncErrorHandler } from "../Utils/AsyncErrorHandler.utils.js";
import User from "../models/user.model.js";
// import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = AsyncErrorHandler(async (req, res, next) => {
  res.json({
    message: "API is working!",
  });
});
