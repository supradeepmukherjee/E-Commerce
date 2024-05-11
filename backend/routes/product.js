import { Router } from 'express'
import { createProduct, delProduct, delReview, getAllProducts, getProducts, productDetails, review, reviewsOfProduct, updateProduct } from '../controllers/product.js'
import { authoriseRoles, isAuthenticated } from '../middlewares/auth.js'
import { multerAttachments } from '../middlewares/multer.js'

const app = Router()

app.get('/products', getProducts)
app.get('/product/:id', productDetails)

app.use(isAuthenticated)
app.put('/review', review)
app.route('/review/:id')
    .get(reviewsOfProduct)
    .delete(delReview)

app.use(authoriseRoles('Admin'))
app.get('/admin/products', getAllProducts)
app.post('/admin/newproduct', multerAttachments, createProduct)
app.route('/admin/product/:id')
    .put(multerAttachments, updateProduct)
    .delete(delProduct)

export default app