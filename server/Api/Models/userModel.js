const mongoose = require('mongoose')

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nama: {
        type: String,
        requred: true
    },
    email: {
        type: String,
        unique: true,
        match: emailRegex,
        requred: true
    },
    password: {
        type: String,
        requred: true
    },
    level: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('User', userSchema)