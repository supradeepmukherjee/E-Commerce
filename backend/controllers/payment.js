import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET)
import { tryCatch } from "../middlewares/error.js"

const processPayment = tryCatch(async (req, res) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amt,
        currency: 'inr',
        metadata: { company: 'ECommerce' }
    })
    res.status(200).json({ success: true, clientSecret: myPayment.client_secret })
})

const apiKey = tryCatch(async (req, res) => res.status(200).json({ success: true, key: process.env.STRIPE_API }))

export { apiKey, processPayment }