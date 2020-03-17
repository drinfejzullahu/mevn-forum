const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: String,
  admin: Boolean
});
module.exports = mongoose.model("Users", UsersSchema);
