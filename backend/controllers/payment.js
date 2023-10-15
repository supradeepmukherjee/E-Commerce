const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.processPayment = async (req, res) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amt,
            currency: 'inr',
            metadata: { company: 'ECommerce' }
        })
        res.status(200).json({ success: true, clientSecret: myPayment.client_secret })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.apiKey = async (req, res) => {
    try {
        res.status(200).json({ success: true, key: process.env.STRIPE_API })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}