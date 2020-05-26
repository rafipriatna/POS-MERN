/*
 * Untuk Cek Auth
 */
const jwt = require('jsonwebtoken')

exports.adminAuth = (req, res, next) => {
    try {
        const token = req
            .headers
            .authorization
            .split(" ")[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        req.userData = decoded
        next();
    } catch (error) {
        return res
            .status(401)
            .json({message: 'Auth failed'})
    }
}