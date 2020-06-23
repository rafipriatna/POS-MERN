const express = require("express");
const router = express.Router();

// Middleware
const checkAuth = require("../Middleware/checkAuth");

// Controllers
const checkTokenController = require("../Controllers/checkTokenController");

// Routes
router.get("/:id", checkAuth.userAuth, checkTokenController);

module.exports = router;
