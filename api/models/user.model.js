import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      validate: {
        validator: function (value) {
          console.log({
            value: value,
            typeOf: typeof value,
          });
          return typeof value === "string";
        },
        message: "Username must be a string.",
      },
      required: [true, " Username is Required."],
      unique: [true, "User already present."],
    },
    age: Number,
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
