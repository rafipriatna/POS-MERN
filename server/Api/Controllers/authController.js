const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../Models/userModel')

exports.masuk = async (req, res, next) => {
    User
        .find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) 
                return res
                    .status(401)
                    .json({pesan: 'User tidak ditemukan'})

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        userId: user[0]._id,
                        userLevel: user[0].level
                    }, process.env.TOKEN_SECRET_KEY, {
                        expiresIn: "1h" // Expired dalam satu jam
                    })
                    return res
                        .status(200)
                        .json({pesan: 'Auth sukses', token: token})
                } else {
                    return res
                        .status(401)
                        .json({pesan: 'User tidak ditemukan'})
                }
            })
        })
}