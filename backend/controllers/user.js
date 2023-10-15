const User = require('../models/User')
const Product = require('../models/Product')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

exports.register = async (req, res) => {
    try {
        const { name, email, password, chavi } = req.body
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ success: false, msg: 'User already exists' })
        const myCloud = await cloudinary.v2.uploader.upload(chavi, {
            folder: 'EcomChavi',
            width: 150,
            crop: 'scale'
        })
        user = await User.create({
            name,
            email,
            password,
            chavi: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            shippingInfo: {
                address: '',
                city: '',
                state: '',
                country: '',
                pincode: 000000,
                phone: 0000000000
            }
        })
        sendToken(user, 201, res)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')
        if (!user) return res.status(401).json({ success: false, msg: "Email or Password is incorrect" })
        const passwordMatched = await user.comparePassword(password)
        if (!passwordMatched) return res.status(401).json({ success: false, msg: "Email or Password is incorrect" })
        sendToken(user, 201, res)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.logout = async (req, res) => res.status(200).cookie('token', null, { expires: new Date(Date.now()), httpOnly: true }).json({ success: true, msg: 'Logged Out' })

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json({ success: false, msg: "Email ID not registered" })
        const token = await user.generateResetPasswordToken()
        await user.save()
        const resetPasswordUrl = `${req.protocol}://${req.get('host')}/resetpassword/${token}`
        const text = `Reset your password by clicking on the link below:\n\n ${resetPasswordUrl}`
        try {
            await sendEmail({ to: user.email, subject: 'Reset your password', text })
            res.status(200).json({ success: true, msg: `Password reset link has been sent to ${user.email}` })
        } catch (err) {
            console.log(err);
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save()
            res.status(500).json({ success: false, msg: err.msg })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) return res.status(400).json({ success: false, msg: 'Token is invalid or has expired' })
        if (req.body.pass !== req.body.cpass) return res.status(400).json({ success: false, msg: 'Passwords do not match' })
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        res.status(200).json({ success: true, msg: 'Password updated successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({ success: true, user })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('+password')
        const { old, newP, cPass } = req.body
        const isMatch = await user.comparePassword(old)
        if (!isMatch) return res.status(400).json({ success: false, msg: 'Old password entered is incorrect' })
        if (cPass !== newP) return res.status(400).json({ success: false, msg: 'Password does not match' })
        user.password = newP
        await user.save()
        res.status(200).json({ success: true, msg: 'Password changed successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const { name, email, chavi } = req.body
        user.name = name
        user.email = email
        if (chavi) {
            await cloudinary.v2.uploader.destroy(user.chavi.public_id)
            const myCloud = await cloudinary.v2.uploader.upload(chavi, {
                folder: 'EcomChavi',
                width: 150,
                crop: 'scale'
            })
            user.chavi.public_id = myCloud.public_id
            user.chavi.url = myCloud.secure_url
        }
        await user.save()
        res.status(200).json({ success: true, user, msg: "Profile Updated" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.allUsers = async (req, res) => { // admin
    try {
        const users = await User.find()
        res.status(200).json({ success: true, users })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.viewUser = async (req, res) => { // admin
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ success: false, msg: "User doesnt exist" })
        res.status(200).json({ success: true, user })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.updateRole = async (req, res) => { // admin
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, {
            new: true,
            runValidators: true
        })
        if (!user) return res.status(404).json({ success: false, msg: "User doesnt exist" })
        res.status(200).json({ success: true, user })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.addItemToCart = async (req, res) => {
    try {
        const { id, qty } = req.body
        let exists = -1
        const user = await User.findById(req.user._id)
        user.cartItems.forEach((item, index) => {
            if (item.item.toString() == id.toString()) exists = index
        })
        if (exists >= 0) {
            user.cartItems[exists].qty = qty
            await user.save()
            res.status(200).json({ success: true, user, msg: 'Quantity updated' })
        } else {
            user.cartItems.push({ item: id, qty })
            await user.save()
            res.status(200).json({ success: true, user, msg: 'Item added' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.cartItems = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const items = []
        for (let i = 0; i < user.cartItems.length; i++) {
            const item = await Product.findById(user.cartItems[i].item).populate('name price images')
            items.push(item)
        }
        res.status(200).json({ success: true, items })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.removeItem = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const itemID = req.params.id
        const result = user.cartItems.filter(_ => _.item.toString() != itemID);
        user.cartItems = result
        await user.save()
        res.status(200).json({ success: true, user, msg: 'Item removed from cart' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.getShipInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({ success: true, shipInfo: user.shippingInfo })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.shipNow = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const { address, city, state, country, pincode, phone } = req.body
        user.shippingInfo.address = address
        user.shippingInfo.city = city
        user.shippingInfo.state = state
        user.shippingInfo.country = country
        user.shippingInfo.pincode = pincode
        user.shippingInfo.phone = phone
        await user.save()
        res.status(200).json({ success: true, shipInfo: user.shippingInfo })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}