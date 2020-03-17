const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB");
const users = require("../router/users");
const posts = require("../router/posts");
const rooms = require("../router/rooms");
const comments = require("../router/comments");

mongoose.Promise = global.Promise;
mongoose.connect(config.DB);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/users", users);
app.use("/posts", posts);
app.use("/rooms", rooms);
app.use("/comments", comments);

var port = process.env.PORT || 4000;

app.listen(port, function() {
  console.log("NodeJS Server Port: ", port);
});
