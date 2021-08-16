const mongoose = require("mongoose");
const { Schema } = mongoose;

const postModel = new Schema({
  body: { type: String, require: true },
  comments: [
    {
      body: { type: String },
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      created_at: { type: String },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  created_at: { type: String },
});

module.exports = mongoose.model("post", postModel, "posts");
