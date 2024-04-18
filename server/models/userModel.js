const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    set: (value) => value.toLowerCase(),
  },
  username: {
    type: String,
    required: true,
    unique: true,
    set: (value) => value.toLowerCase(),
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
});

exports.User = mongoose.model("User", UserSchema);
