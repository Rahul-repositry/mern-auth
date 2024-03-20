import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { AsyncErrorHandler } from "../Utils/AsyncErrorHandler.utils.js";
import CustomError from "../Utils/CustomError.utils.js";

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

export const signin = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email });
  if (!validUser) return next(new CustomError("User not found", 400));
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) return next(new CustomError("User not found", 401));
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  const { password: hashedPassword, ...rest } = validUser._doc;
  const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60); // 1 hour
  res
    .cookie("access_token", token, {
      httpOnly: true, // helps  prevent access to cookie through client-side scripting
      expires: expiryDate,
      // secure: true, // helps  with encrypting the cookie and prevents it being sent on http
    })
    .status(200)
    .json(rest);
});
