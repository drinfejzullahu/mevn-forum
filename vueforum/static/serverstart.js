var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(express.static("public"));

//Serves all the request which includes /images in the url from Images folder
app.use("/images", express.static(__dirname + "/images"));

var server = app.listen(5000);
