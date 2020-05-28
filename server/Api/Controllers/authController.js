const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../Models/userModel')

exports.masuk = async (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user === null)
            return res.status(401).json({
                message: "Auth gagal"
            })
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({
                    userId: user.id,
                    level: user.level
                }, process.env.TOKEN_SECRET_KEY, {
                    expiresIn: "1h" // Expired dalam satu jam
                })
                return res
                        .status(200)
                        .json({
                            message: 'Auth sukses',
                            token: token,
                            expired: "1 Jam"
                        })
            }else{
                res.status(401).json({
                    message: "Auth gagal"
                })
            }
        })
    })
}