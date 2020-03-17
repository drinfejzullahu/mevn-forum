var Users = require("../models/User");
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

var multer = require("multer");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../forum/static/images/");
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.indexOf(".") + 1);
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  }
});
var upload = multer({
  storage: storage
});
/* GET ALL Users */
router.get("/", function(req, res, next) {
  Users.find(function(err, Users) {
    if (err) return next(err);
    res.json(Users);
  });
});

/* GET SINGLE Users BY ID */
router.get("/:id", function(req, res, next) {
  Users.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post("/", upload.single("image"), function(req, res) {
  let users = req.body;
  users.username = req.body.username;
  users.email = req.body.email;
  users.password = req.body.password;
  users.image = req.body.image != "undefined" ? req.file.filename : null;
  users.admin = req.body.admin;

  Users.create(users, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get("/email/:email", function(req, res, next) {
  console.log(req);
  Users.findOne(req.params, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Users */
// router.post("/", function(req, res, next) {
//   Users.create(req.body, function(err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* UPDATE Users */
router.put("/:id", function(req, res, next) {
  console.log(req.body);
  Users.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Users */
router.delete("/:id", function(req, res, next) {
  Users.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
