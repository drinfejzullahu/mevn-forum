const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema({
  comment: String,
  postId: String,
  username: String
});
module.exports = mongoose.model("Comments", CommentsSchema);
