const sendToken = (user, statusCode, res) => {
    const token = user.getJWTtoken()
    res.status(statusCode).cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + (process.env.COOKIE_EXPIRY * 24 * 60 * 60000))
    }).json({ success: true, user, token })
}

module.exports = sendToken