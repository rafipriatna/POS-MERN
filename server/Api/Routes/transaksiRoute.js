const express = require('express')
const router = express.Router()

// Middleware
const checkAuth = require('../Middleware/checkAuth')

// Controllers
const transaksiController = require('../Controllers/transaksiController')

// Routes
router.post('/', checkAuth.userAuth, transaksiController.createTransaksi)

module.exports = router