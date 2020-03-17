var Posts = require("../models/Post");
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

/* GET ALL Posts */
router.get("/", function(req, res, next) {
  Posts.find(function(err, Posts) {
    if (err) return next(err);
    res.json(Posts);
  });
});

/* GET SINGLE Post BY ID */
router.get("/:id", function(req, res, next) {
  Posts.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Posts */
router.post("/", function(req, res, next) {
  Posts.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Posts */
router.put("/:id", function(req, res, next) {
  console.log(req.body);
  Posts.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Posts */
router.delete("/:id", function(req, res, next) {
  Posts.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
