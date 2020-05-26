const express       = require('express')
const app           = express()
const morgan        = require('morgan')
const bodyParser    = require('body-parser')
const mongoose      = require('mongoose')

require('dotenv').config() // Environment

// Routes API
const usersRoute = require('./Api/Routes/usersRoute')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// Test Server
// app.use((req, res, next) => {
//     console.log("Server is running!")
// })

// Middleware
app.use(morgan('dev'))
// app.use('/uploads', express.static('uploads'))
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
app.use('/users', usersRoute)

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