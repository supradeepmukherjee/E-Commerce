const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ msg: 'Please login first' })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
}

exports.authoriseRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return res.status(403).json({ success: false, msg: `${req.user.role} is not authorised to perform this action` })
        next()
    }
}