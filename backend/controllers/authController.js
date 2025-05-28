import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const Signup = async (req, res) => {
  try {
    const { firstname, lastname, username, password, gender } = req.body;

    // VALIDATE INPUTS
    if (!firstname || !lastname || !username || !password || !gender) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a random profile picture URL based
    const profilePic =
      gender === "male"
        ? "https://avatar.iran.liara.run/public/boy"
        : gender === "female"
        ? "https://avatar.iran.liara.run/public/girl"
        : `https://avatar.iran.liara.run/username?username=${firstname}+${lastname}`;

    const newUser = new User({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });

    if (newUser) {
      // Generate JWT Token
      generateToken(newUser, res);
      // Save user to the database
      await newUser.save();

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          username: newUser.username,
          gender: newUser.gender,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // VALIDATE INPUTS
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    // taking the token from the generateToken function is totally optional and not recommended for security reasons, because it is already sent in the cookie and you can use it from there, there is no need to send it in the response.
    // but if you want to send it in the response, you can do it like this
    const token = generateToken(user, res);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        gender: user.gender,
        profilePic: user.profilePic,
      },
      // You can Also Send the token in the response (Not recommended for security reasons)
      token: token,
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
