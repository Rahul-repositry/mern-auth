import jwt from "jsonwebtoken";

import CustomError from "./CustomError.utils.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(new CustomError("You are not authenticated!", 401));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new CustomError("Token is not valid!", 403));

    req.user = user;
    next();
  });
};
