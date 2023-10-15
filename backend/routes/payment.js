const express = require('express')
const { processPayment, apiKey } = require('../controllers/payment')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

router.route('/processpayment').post(isAuthenticated, processPayment)
router.route('/key').get(apiKey)

module.exports = router