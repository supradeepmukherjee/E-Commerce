const express = require('express')
const { newOrder, singleOrder, myOrders, allOrders, delOrder,  updateOrderStatus } = require('../controllers/order')
const { isAuthenticated, authoriseRoles } = require('../middlewares/auth')

const router = express.Router()

router.route('/neworder').post(isAuthenticated, newOrder)
router.route('/myorders').get(isAuthenticated, myOrders)
router.route('/order/:id').get(isAuthenticated, singleOrder)
router.route('/admin/allorders').get(isAuthenticated, authoriseRoles('Admin'), allOrders)
router.route('/admin/delorder/:id').delete(isAuthenticated, authoriseRoles('Admin'), delOrder)
router.route('/admin/updateorderstatus/:id').put(isAuthenticated, authoriseRoles('Admin'), updateOrderStatus)

module.exports = router