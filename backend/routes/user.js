const express = require('express')
const { register, login, logout, forgotPassword, resetPassword, userDetails, updatePassword, updateProfile, allUsers, viewUser, updateRole, addItemToCart, cartItems, removeItem, getShipInfo, shipNow } = require('../controllers/user')
const { isAuthenticated, authoriseRoles } = require('../middlewares/auth')

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:token').put(resetPassword)
router.route('/me').get(isAuthenticated, userDetails)
router.route('/updatepassword').put(isAuthenticated, updatePassword)
router.route('/updateprofile').put(isAuthenticated, updateProfile)
router.route('/addtocart').put(isAuthenticated, addItemToCart)
router.route('/cartitems').get(isAuthenticated, cartItems)
router.route('/getship').get(isAuthenticated, getShipInfo)
router.route('/shipnow').put(isAuthenticated, shipNow)
router.route('/removeitem/:id').put(isAuthenticated, removeItem)
router.route('/admin/users').get(isAuthenticated, authoriseRoles('Admin'), allUsers)
router.route('/admin/updaterole/:id').put(isAuthenticated, authoriseRoles('Admin'), updateRole)
router.route('/admin/user/:id').get(isAuthenticated, authoriseRoles('Admin'), viewUser)

module.exports = router