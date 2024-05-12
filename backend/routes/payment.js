import { Router } from 'express'
import { processPayment, apiKey, secretKey } from '../controllers/payment.js'
import { isAuthenticated } from '../middlewares/auth.js'

const app = Router()

app.get('/key', apiKey)
app.get('/secret-key', secretKey)
app.post('/processpayment', isAuthenticated, processPayment)

export default app