const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const { createUser } = require("../controllers/auth.controllers");

router.post("/signup", createUser);

router.post("/sigin", (req, res) => {
  res.send("helo");
});

router.get("/me", (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: "false",
      message: "No token provided",
    });
  }

  const decoded = jwt.verify(token, config.secret)
  res.send(decoded);
});

module.exports = router;
