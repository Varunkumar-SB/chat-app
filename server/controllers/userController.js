const { User } = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error in getUsers Controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
