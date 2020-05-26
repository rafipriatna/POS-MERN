const express = require('express')
const router = express.Router()

// Controllers
const usersController = require('../Controllers/userController')

// Routes
router.post('/', usersController.createUser)

module.exports = router