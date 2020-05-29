const express = require('express')
const router = express.Router()

// Middleware
const checkAuth = require('../Middleware/checkAuth')

// Controllers
const penjualanController = require('../Controllers/penjualanController')

// Routes
router.post('/', checkAuth.adminAuth, penjualanController.createPenjualan)
router.get('/', checkAuth.adminAuth, penjualanController.getAllPenjualan)
router.get('/:kode_penjualan', checkAuth.adminAuth, penjualanController.getPenjualanByKodePenjualan)
router.patch('/:id', checkAuth.adminAuth, penjualanController.updateOneItemPenjualan)
router.delete('/:id', checkAuth.adminAuth, penjualanController.deleteOnePenjualan)

module.exports = router