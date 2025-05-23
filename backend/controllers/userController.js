import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    // current logged in user id
    const userId = req.user._id;

    // Here we are getting all the users except the currently logged-in user.
    // const allUsers = await User.find({ _id: { $ne: userId } });
    // However, because I want to keep an option to message ourselves, we will handle this differently below.
    const allUsers = await User.find({}).select("-password");
    // select("-password") simply means that the password field will be excluded from the returned user documents.

    if (!allUsers) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in get all user controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllUsers };
