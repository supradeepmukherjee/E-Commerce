const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

exports.newOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const { shippingInfo, orderedItems, paymentInfo, itemsSubtotal, tax, shippingCharge, amt } = req.body
        const order = await Order.create({
            shippingInfo,
            orderedItems,
            paymentInfo,
            itemsSubtotal,
            tax,
            shippingCharge,
            amt,
            paidAt: Date.now(),
            user: req.user._id
        })
        user.cartItems = []
        await user.save()
        res.status(201).json({ success: true, order, user })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.singleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')
        if (!order) return res.status(404).json({ success: false, msg: "Order not found" })
        res.status(200).json({ success: true, order })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        res.status(200).json({ success: true, orders })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.allOrders = async (req, res) => { // admin
    try {
        const products = await Product.find({ user: req.user._id })
        const orders = await Order.find().populate('user', 'name email')
        let filteredOrders = []
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].orderedItems.length; j++) {
                for (let k = 0; k < products.length; k++) {
                    if (orders[i].orderedItems[j].product.toString() === products[k]._id.toString()) {
                        filteredOrders.push(orders[i])
                    }
                }
            }
        }
        let totalAmt = 0
        filteredOrders.forEach(order => totalAmt += order.amt);
        res.status(200).json({ totalAmt, success: true, orders: filteredOrders })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.updateOrderStatus = async (req, res) => { // admin
    try {
        const order = await Order.findById(req.params.id)
        if (!order) return res.status(404).json({ success: false, msg: "Order not found" })
        const updateStock = async (id, qty) => {
            const product = await Product.findById(id)
            product.stock -= qty
            await product.save()
        }
        order.orderStatus = req.body.status
        if (req.body.status === 'Delivered') {
            order.orderedItems.forEach(async item => await updateStock(item.product, item.qty))
            order.deliveredAt = Date.now()
        }
        await order.save()
        res.status(200).json({ success: true, msg: 'Order status updated' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.delOrder = async (req, res) => { // admin
    try {
        const order = await Order.findById(req.params.id)
        if (!order) return res.status(404).json({ success: false, msg: "Order not found" })
        await Order.deleteOne({ _id: order._id })
        res.status(200).json({ success: true, msg: "order deleted" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}