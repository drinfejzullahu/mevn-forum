const mongoose = require("mongoose");

const RoomsSchema = mongoose.Schema({
  title: String,
  description: String
});
module.exports = mongoose.model("Rooms", RoomsSchema);
