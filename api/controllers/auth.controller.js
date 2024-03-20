import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { AsyncErrorHandler } from "../Utils/AsyncErrorHandler.utils.js";

export const signup = AsyncErrorHandler(async (req, res, next) => {
  const { username, age, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(String(password), 10);
  console.log(typeof username);
  let newUsername = username;
  const newUser = new User({
    username: newUsername,
    age,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();
  console.log(savedUser); // Log the saved document
  res.status(201).json({ message: "User created successfully", savedUser });
});
