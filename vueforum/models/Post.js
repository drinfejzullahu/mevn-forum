const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema({
  title: String,
  description: String,
  room: String,
  email: String,
  username: String,
  likes: Number,
  likedBy: [String],
  unlikedBy: [String]
});
module.exports = mongoose.model("Posts", PostsSchema);
