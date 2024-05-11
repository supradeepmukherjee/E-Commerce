const sendToken = (user, statusCode, res, msg = '') => {
    const token = user.getJWTtoken()
    res.status(statusCode).cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(Date.now() + (process.env.COOKIE_EXPIRY * 24 * 60 * 60000))
    }).json({ success: true, user, token, msg })
}

export default sendToken