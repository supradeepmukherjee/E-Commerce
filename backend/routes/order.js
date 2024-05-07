import { Router } from 'express'
import { newOrder, singleOrder, myOrders, allOrders, delOrder, updateOrderStatus } from '../controllers/order.js'
import { authoriseRoles } from '../middlewares/auth.js'

const app = Router()

app.post('/neworder', newOrder)
app.get('/myorders', myOrders)
app.get('/order/:id', singleOrder)

app.use(authoriseRoles('Admin'))
app.get('/admin/allorders', allOrders)
app.delete('/admin/delorder/:id', delOrder)
app.put('/admin/updateorderstatus/:id', updateOrderStatus)

export default app