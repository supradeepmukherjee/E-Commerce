const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const fileUploader = require('express-fileupload')
const app = express()

dotenv.config({ path: 'config/config.env' })

app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(fileUploader())

const product = require('./routes/product')
const user = require('./routes/user')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)
app.use('/api/v1', payment)

module.exports = app