var Rooms = require("../models/Room");
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

/* GET ALL Rooms */
router.get("/", function(req, res, next) {
  Rooms.find(function(err, Rooms) {
    if (err) return next(err);
    res.json(Rooms);
  });
});

/* GET SINGLE Rooms BY ID */
router.get("/:id", function(req, res, next) {
  Rooms.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Rooms */
router.post("/", function(req, res, next) {
  Rooms.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Rooms */
router.put("/:id", function(req, res, next) {
  console.log(req.body);
  Rooms.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Rooms */
router.delete("/:id", function(req, res, next) {
  Rooms.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
