const express = require('express')
const router = express.Router()

// Middleware
const checkAuth = require('../Middleware/checkAuth')

// Controllers
const barangController = require('../Controllers/barangController')

// Routes
router.post('/', checkAuth.adminAuth, barangController.createBarang)
router.get('/', checkAuth.adminAuth, barangController.getAllBarang)
router.get('/:id', checkAuth.adminAuth, barangController.getBarangById)
router.patch('/:id', checkAuth.adminAuth, barangController.updateBarang)
router.delete('/:id', checkAuth.adminAuth, barangController.deleteBarang)

module.exports = router