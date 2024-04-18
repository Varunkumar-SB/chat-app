const bcryptjs = require("bcryptjs");
const { User } = require("../models/userModel");
const { generateJWTandSetCookie } = require("../utils/generateJWT");

exports.createUser = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    const lowerCaseUsername = username.toLowerCase();

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const mail = await User.findOne({ email: lowerCaseEmail });
    if (mail) {
      return res
        .status(400)
        .json({ error: "An account with this email address already exists" });
    }

    const user = await User.findOne({ username: lowerCaseUsername });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const profilePic = `https://avatar.iran.liara.run/username?username=${lowerCaseUsername}&length=1`;

    const newUser = new User({
      email: lowerCaseEmail,
      username: lowerCaseUsername,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      generateJWTandSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in SignUp Controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    generateJWTandSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in LogIn Controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successufully" });
  } catch (error) {
    console.log("Error in LogOut Controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
