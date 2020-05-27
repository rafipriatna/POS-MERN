const jwt = require('jsonwebtoken')

exports.adminAuth = (req, res, next) => {
    try {
        const token = req
            .headers
            .authorization
            .split(" ")[1] // Split Bearer header
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        if (decoded.level === 0) {
            next()
        } else {
            return res
                .status(401)
                .json({
                    error: 'Auth failed'
                })
        }
    } catch (error) {
        return res
            .status(401)
            .json({
                error: 'Auth failed'
            })
    }
}