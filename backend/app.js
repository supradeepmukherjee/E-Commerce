import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import fileUploader from 'express-fileupload'
import { join, resolve } from 'path'
import product from './routes/product.js'
import user from './routes/user.js'
import order from './routes/order.js'
import payment from './routes/payment.js'
import cors from 'cors'
import { isAuthenticated } from './middlewares/auth.js'

const app = express()

if (process.env.NODE_ENV !== 'production') config({ path: 'config/config.env' })

app.use(cors({ origin: 'https://ecommerce-supradeep.onrender.com/' }))
app.use(json({ limit: '50mb' }))
app.use(cookieParser())
app.use(urlencoded({ limit: '50mb', extended: true }))
app.use(fileUploader())

app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', payment)

app.use(isAuthenticated)
app.use('/api/v1', order)

// if (process.env.NODE_ENV === 'production') {
//     app.use(static(join(__dirname, '../frontend/build')))
//     app.get('*', (req, res) => res.sendFile(resolve(__dirname, "../frontend/build/index.html")))
// }

export default app