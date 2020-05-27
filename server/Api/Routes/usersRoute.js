const express = require('express')
const router = express.Router()

// Middleware
const checkAuth = require('../Middleware/checkAuth')

// Controllers
const usersController = require('../Controllers/userController')

// Routes
router.post('/', checkAuth.adminAuth, usersController.createUser)
router.get('/', checkAuth.adminAuth, usersController.getAllUsers)
router.get('/:userId', checkAuth.adminAuth, usersController.getUserById)
router.patch('/:userId', checkAuth.adminAuth, usersController.updateUser)
router.delete('/:userId', checkAuth.adminAuth, usersController.deleteUser)

module.exports = router