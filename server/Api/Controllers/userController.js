const {
    Op
} = require("sequelize");

const User = require('../Models/userModel')

// Membuat user baru
exports.createUser = (req, res, next) => {
    User
        .findOrCreate({
            where: {
                [Op.or]: [{
                    username: req.body.username
                }, {
                    surel: req.body.surel
                }]
            },
            defaults: {
                username: req.body.username,
                nama: req.body.nama,
                surel: req.body.surel,
                password: req.body.password,
                level: 0,
                foto: 'test.jpg',
                last_login: new Date()
            }
        })
        .spread((dataUser, isCreated) => {
            if (isCreated === false) {
                res
                    .status(409)
                    .json({
                        error: "Username atau email sudah terdaftar"
                    })
            } else {
                res
                    .status(200)
                    .json({
                        message: "Berhasil membuat user baru"
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

// Mengambil semua users
exports.getAllUsers = (req, res, next) => {
    User
        .findAll({
            attributes: [
                'id',
                'username',
                'surel',
                'nama',
                'level',
                'foto',
                'last_login'
            ]
        })
        .then(users => {
            if (user === null)
                return res
                    .status(404)
                    .json({
                        error: "Data tidak ditemukan"
                    })
            const response = {
                cout: users.length,
                keterangan: "Level 0 untuk role Admin, level 1 untuk role Kasir",
                users: users.map(user => {
                    return {
                        id: user.id,
                        username: user.username,
                        surel: user.surel,
                        nama: user.nama,
                        level: user.level,
                        foto: user.foto,
                        last_login: user.last_login
                    }
                })
            }
            res
                .status(200)
                .json(response)
        })
}

// Mengambil user berdasarkan id
exports.getUserById = (req, res, next) => {
    User
        .findOne({
            where: {
                id: req.params.userId
            }
        })
        .then(user => {
            if (user === null)
                return res
                    .status(404)
                    .json({
                        error: "Data tidak ditemukan"
                    })
            const response = {
                keterangan: "Level 0 untuk role Admin, level 1 untuk role Kasir",
                users: {
                    id: user.id,
                    username: user.username,
                    surel: user.surel,
                    nama: user.nama,
                    level: user.level,
                    foto: user.foto,
                    last_login: user.last_login
                }
            }
            res
                .status(200)
                .json(response)
        })
}

// Update user
exports.updateUser = (req, res, next) => {
    
}