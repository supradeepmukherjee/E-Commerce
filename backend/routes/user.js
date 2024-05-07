import { Router } from 'express'
import { register, login, logout, forgotPassword, resetPassword, userDetails, updatePassword, updateProfile, allUsers, viewUser, updateRole, addItemToCart, cartItems, removeItem, getShipInfo, shipNow } from '../controllers/user.js'
import { isAuthenticated, authoriseRoles } from '../middlewares/auth.js'

const app = Router()

app.post('/register', register)
app.post('/login', login)
app.get('/logout', logout)
app.post('/forgotpassword', forgotPassword)
app.put('/resetpassword/:token', resetPassword)

app.use(isAuthenticated)
app.get('/me', userDetails)
app.put('/updatepassword', updatePassword)
app.put('/updateprofile', updateProfile)
app.put('/addtocart', addItemToCart)
app.get('/cartitems', cartItems)
app.get('/getship', getShipInfo)
app.put('/shipnow', shipNow)
app.put('/removeitem/:id', removeItem)

app.use(authoriseRoles('Admin'))
app.get('/admin/users', allUsers)
app.put('/admin/updaterole/:id', updateRole)
app.get('/admin/user/:id', viewUser)

export default app