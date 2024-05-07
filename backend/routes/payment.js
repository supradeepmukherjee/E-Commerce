import { Router } from 'express'
import { processPayment, apiKey } from '../controllers/payment.js'
import { isAuthenticated } from '../middlewares/auth.js'

const app = Router()

app.post('/processpayment', isAuthenticated, processPayment)
app.get('/key', apiKey)

export default app