const express = require('express')
const { getAllProducts, createProduct, updateProduct, delProduct, productDetails, review, reviewsOfProduct, delReview, getProducts } = require('../controllers/product')
const { isAuthenticated, authoriseRoles } = require('../middlewares/auth')

const router = express.Router()

router.route('/products').get(getProducts)
router.route('/admin/products').get(isAuthenticated, authoriseRoles('Admin'), getAllProducts)
router.route('/admin/newproduct').post(isAuthenticated, authoriseRoles('Admin'), createProduct)
router.route('/admin/product/:id').put(isAuthenticated, authoriseRoles('Admin'), updateProduct).delete(isAuthenticated, authoriseRoles('Admin'), delProduct)
router.route('/product/:id').get(productDetails)
router.route('/review').put(isAuthenticated, review)
router.route('/review/:id').get(reviewsOfProduct).delete(isAuthenticated, delReview)

module.exports = router