const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const User = require('../Models/userModel')

// Membuat user baru
exports.createUser = async (req, res, next) => {
    User
        .find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length > 0) 
                return res
                    .status(409)
                    .json({error: "Email sudah ada"})

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) 
                    return res
                        .status(500)
                        .json({error: err})
                const user = new User({
                    _id: new mongoose
                        .Types
                        .ObjectId(),
                    nama: req.body.nama,
                    email: req.body.email,
                    password: hash,
                    level: req.body.level
                })
                user
                    .save()
                    .then(result => {
                        res
                            .status(201)
                            .json({pesan: "User berhasil dibuat"})
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .json({error: err})
                    })
                })
        })
}

exports.getAllUsers = async (req, res, next) => {
    User.find()
}