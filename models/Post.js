const mongoose = require("mongoose");

// create a mongoose schema

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  category: String,
  likes: Number,
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// create a model using schema

const Post = mongoose.model("post", postSchema);

module.exports = Post;
