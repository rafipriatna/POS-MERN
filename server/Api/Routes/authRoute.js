const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../Controllers/authController");

// Routes
router.post("/masuk", authController.masuk);

module.exports = router;
