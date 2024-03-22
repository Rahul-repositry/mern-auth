import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { AsyncErrorHandler } from "../Utils/AsyncErrorHandler.utils.js";
import CustomError from "../Utils/CustomError.utils.js";

export const signup = AsyncErrorHandler(async (req, res, next) => {
  const { username, age, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(String(password), 10);
  let newUsername = username;
  const newUser = new User({
    username: newUsername,
    age,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();

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
  const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60); // 60 days
  res
    .cookie("access_token", token, {
      httpOnly: true, // helps  prevent access to cookie through client-side scripting
      expires: expiryDate,
      // secure: true, // helps  with encrypting the cookie and prevents it being sent on http
    })
    .status(200)
    .json(rest);
});

export const google = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = user._doc;
    const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60); // 60 days
    res
      .cookie("access_token", token, {
        httpOnly: true, // helps  prevent access to cookie through client-side scripting
        expires: expiryDate,
        // secure: true, // helps  with encrypting the cookie and prevents it being sent on http
      })
      .status(200)
      .json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8); // This converts the random number to a base-36 string. Base-36 uses digits 0-9 and letters a-z (26 letters) to represent numbers. This allows encoding a wider range of values compared to base-10 (decimal).
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    const newUser = new User({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-8),
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.photo,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword2, ...rest } = newUser._doc;
    const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60); // 60 days
    res
      .cookie("access_token", token, {
        httpOnly: true, // helps  prevent access to cookie through client-side scripting
        expires: expiryDate,
        // secure: true, // helps  with encrypting the cookie and prevents it being sent on http
      })
      .status(200)
      .json(rest);
  }
});

// update user

export const updateUser = AsyncErrorHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new CustomError("You can update only your account!", 401));
  }

  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
      },
    },
    { new: true }
  );
  const { password, ...rest } = updatedUser._doc;
  res.status(200).json(rest);
});

// delete user

export const deleteUser = AsyncErrorHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new CustomError("You can delete only your account!", 401));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json("User has been deleted...");
});
