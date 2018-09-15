const mongoose = require("mongoose");

// create a mongoose schema

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String },
  phone: String,
  password: { type: String },
  date: { type: Date, default: Date.now },
  access_token: { type: String },
  isStaff: Boolean
});

// create a model using schema

const User = mongoose.model("user", userSchema);

module.exports = User;
