import Stripe from 'stripe'
import { tryCatch } from "../middlewares/error.js"

const stripe = new Stripe(process.env.STRIPE_KEY)

const processPayment = tryCatch(async (req, res) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amt,
        currency: 'inr',
        metadata: { company: 'ECommerce' }
    })
    res.status(200).json({ success: true, clientSecret: myPayment.client_secret })
})

export { processPayment }