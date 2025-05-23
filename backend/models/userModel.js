import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  // createdAt and updatedAt are automatically added by mongoose
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
