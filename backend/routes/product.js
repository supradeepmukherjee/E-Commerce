import { Router } from 'express'
import { getAllProducts, createProduct, updateProduct, delProduct, productDetails, review, reviewsOfProduct, delReview, getProducts } from '../controllers/product.js'
import { isAuthenticated, authoriseRoles } from '../middlewares/auth.js'

const app = Router()

app.route('/products').get(getProducts)
app.route('/product/:id').get(productDetails)

app.use(isAuthenticated)
app.put('/review', review)
app.route('/review/:id')
    .get(reviewsOfProduct)
    .delete(delReview)

app.use(authoriseRoles('Admin'))
app.get('/admin/products', getAllProducts)
app.post('/admin/newproduct', createProduct)
app.route('/admin/product/:id')
    .put(updateProduct)
    .delete(delProduct)

export default app