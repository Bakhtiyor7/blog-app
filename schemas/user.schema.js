const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    required: true,
    index: { unique: true, sparse: true },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
