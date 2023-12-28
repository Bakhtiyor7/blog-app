const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: { unique: true, sparse: true },
    },
    user_name: {
      type: String,
      required: true,
      index: { unique: true, sparse: true },
    },
    email: {
      type: String,
      email: true,
      required: true,
      index: { unique: true, sparse: true },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
