import { Router } from 'express'
import { processPayment } from '../controllers/payment.js'

const app = Router()

app.post('/processpayment', processPayment)

export default app