import CartItemCard from '../CartItemCard/CartItemCard'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getItems, removeItem } from '../../../Actions/Cart'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import alert from '../../../alert'
import Alert from '../../Alert'
import { loadUser } from '../../../Actions/User'
import EmptyCart from '@mui/icons-material/RemoveShoppingCart'
import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, cartItems } = useSelector(state => state.cartItems)
  const itemsQty = useSelector(state => state.user.user.cartItems)
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  let gTotal = 0
  // eslint-disable-next-line array-callback-return
  cartItems && cartItems.map(item => {
    let value, sTotal
    for (let i = 0; i < itemsQty.length; i++) {
      if (item._id === itemsQty[i].item) value = itemsQty[i].qty
    }
    sTotal = item.price * value
    gTotal += sTotal
  })
  const dec = async (id, qty) => {
    const newQty = qty - 1
    alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
    await dispatch(addToCart(id, newQty))
    await dispatch(loadUser())
    alert('success', setAlertType, 'Quantity Updated', setAlertMsg, setAlertVisibility, dispatch)
  }
  const inc = async (id, qty, stock) => {
    const newQty = qty + 1
    if (stock <= qty) {
      alert('error', setAlertType, 'Maximum Stock Quantity', setAlertMsg, setAlertVisibility, dispatch)
      return
    }
    alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
    await dispatch(addToCart(id, newQty))
    await dispatch(loadUser())
    alert('success', setAlertType, 'Quantity Updated', setAlertMsg, setAlertVisibility, dispatch)
  }
  const remove = async id => {
    alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
    await dispatch(removeItem(id))
    await dispatch(loadUser())
    await dispatch(getItems())
    alert('success', setAlertType, 'Item removed from Cart', setAlertMsg, setAlertVisibility, dispatch)
  }
  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error])
  return (
    <>
      {loading ? <Loader /> : <>
        <MetaData title={`CART`} />
        <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
        {itemsQty.length < 1 ?
          <div className="emptyCart">
            <EmptyCart />
            <Typography>
              No Products in your Cart
            </Typography>
            <Link to={`/products`}>
              View Products
            </Link>
          </div>
          :
          <div className="cart">
            <div className="cartHeader">
              <p>
                Product
              </p>
              <p>
                Quantity
              </p>
              <p>
                Subtotal
              </p>
            </div>
            {cartItems && cartItems.map(item => {
              let value, sTotal
              for (let i = 0; i < itemsQty.length; i++) {
                if (item._id === itemsQty[i].item) value = itemsQty[i].qty
              }
              sTotal = item.price * value
              return (
                <div className="cartContainer" key={item._id}>
                  <CartItemCard item={item} remove={remove} />
                  <div className="cartInput">
                    <button disabled={value === 1 || loading} onClick={() => dec(item._id, value)}>
                      -
                    </button>
                    <span className='value'>
                      {value}
                    </span>
                    <button disabled={loading} onClick={() => inc(item._id, value, item.stock)}>
                      +
                    </button>
                  </div>
                  <div className="cartSubtotal">
                    Rs. {sTotal}
                  </div>
                </div>
              )
            })}
            <div className="cartGrossTotal">
              <div className=""></div>
              <div className="cartGrossTotalBox">
                <p>
                  Gross Total
                </p>
                <p>
                  Rs. {gTotal}
                </p>
              </div>
              <div className=""></div>
              <div className="checkoutBtn">
                <button onClick={() => navigate('/registerlogin?redirect=shipping')}>
                  Check Out
                </button>
              </div>
            </div>
          </div>}
      </>}
    </>
  )
}

export default Cart