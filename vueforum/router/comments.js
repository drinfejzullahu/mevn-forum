var Comments = require("../models/Comment");
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

/* GET ALL Comments */
router.get("/", function(req, res, next) {
  Comments.find(function(err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

/* GET SINGLE Comments BY ID */
router.get("/:id", function(req, res, next) {
  Comments.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Comments */
router.post("/", function(req, res, next) {
  Comments.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Comments */
router.put("/:id", function(req, res, next) {
  console.log(req.body);
  Comments.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Comments */
router.delete("/:id", function(req, res, next) {
  Comments.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
