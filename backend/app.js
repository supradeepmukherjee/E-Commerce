const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const fileUploader = require('express-fileupload')
const path = require('path')
const cors = require('cors')
const app = express()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'config/config.env' })
}

app.use(cors({ origin: 'https://ecommerce-supradeep.onrender.com/' }))
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")))
}

module.exports = app