const express = require('express')
const router = express.Router()

// Middleware
const checkAuth = require('../Middleware/checkAuth')

// Controllers
const usersController = require('../Controllers/userController')

// Routes
router.post('/', checkAuth.adminAuth, usersController.createUser)
router.get('/', checkAuth.adminAuth, usersController.getAllUsers)
router.get('/:id', checkAuth.adminAuth, usersController.getUserById)
router.patch('/:id', checkAuth.adminAuth, usersController.updateUser)
router.delete('/:id', checkAuth.adminAuth, usersController.deleteUser)

module.exports = router