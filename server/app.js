const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config() // Environment

// Routes API
const usersRoutes = require('./Api/Routes/usersRoute')
const authRoutes = require('./Api/Routes/authRoute')
const barangRoutes = require('./Api/Routes/barangRoute')
const penjualanRoute = require('./Api/Routes/penjualanRoute')

// Test Server
// app.use((req, res, next) => {
//     console.log("Server is running!")
// })

// Middleware
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// Another middleware. Get header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-with, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE')
        return res.status(200).json({})
    }
    next()
})

// Routes
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/barang', barangRoutes)
app.use('/penjualan', penjualanRoute)

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found!')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: "Error : " + error.message
        }
    })
})

module.exports = app