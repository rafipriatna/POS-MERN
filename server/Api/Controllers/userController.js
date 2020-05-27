const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const User = require('../Models/userModel')

// Membuat user baru
exports.createUser = (req, res, next) => {
    User
        .find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length > 0)
                return res
                    .status(409)
                    .json({
                        error: "Email sudah ada"
                    })

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err)
                    return res
                        .status(500)
                        .json({
                            error: err
                        })
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
                            .json({
                                pesan: "User berhasil dibuat"
                            })
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .json({
                                error: err
                            })
                    })
            })
        })
}

// Mengambil semua users
exports.getAllUsers = (req, res, next) => {
    User
        .find()
        .select('_id nama email level')
        .exec()
        .then(users => {
            const response = {
                count: users.length,
                keterangan: "Level 0 untuk role Admin, level 1 untuk role Kasir.",
                users: users.map(user => {
                    return {
                        _id: user._id,
                        nama: user.nama,
                        email: user.email,
                        level: user.level
                    }
                })
            }
            if (users.length > 0) {
                res
                    .status(200)
                    .json(response)
            } else {
                res
                    .status(404)
                    .json({
                        pesan: "Belum ada data"
                    })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
}

// Mengambil user berdasarkan id
exports.getUserById = (req, res, next) => {
    const userId = req.params.userId
    User
        .findById(userId)
        .select('_id nama email level')
        .exec()
        .then(user => {
            if (user) {
                res
                    .status(200)
                    .json({
                        keterangan: "Level 0 untuk role Admin, level 1 untuk role Kasir.",
                        user: {
                            _id: user._id,
                            nama: user.nama,
                            email: user.email,
                            level: user.level
                        }
                    })
            } else {
                res
                    .status(404)
                    .json({
                        pesan: "User tidak ditemukan"
                    })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
}

// Update user
exports.updateUser = (req, res, next) => {
    const userId = req.params.userId
    User
        .updateOne({
            _id: userId
        }, {
            $set: req.body
        })
        .exec()
        .then(result => {
            res
                .status(200)
                .json({
                    pesan: "User berhasil diupdate"
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
}

// Delete user
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId
    User
        .deleteOne({
            _id: userId
        })
        .exec()
        .then(result => {
            res
                .status(200)
                .json({
                    pesan: "User berhasil dihapus"
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
}