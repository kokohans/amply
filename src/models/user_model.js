const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema({
  username: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  description: { type: String },
});

module.exports = mongoose.model("user", userModel, "users");
