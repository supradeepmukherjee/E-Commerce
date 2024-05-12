import EmptyCart from '@mui/icons-material/RemoveShoppingCart'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import useMutation from '../../../hooks/useMutation'
import { useAddToCartMutation, useGetItemsQuery, useLazyGetItemsQuery, useRemoveItemMutation } from '../../../redux/api/cart'
import { useLazyGetUserQuery } from '../../../redux/api/user'
import { userExists, userNotExists } from '../../../redux/reducers/auth'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import CartItemCard from '../CartItemCard/CartItemCard'
import './Cart.css'

const Cart = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const itemsQty = useSelector(({ auth }) => auth.user.cartItems)
  const [cartItems, setCartItems] = useState([])
  const { data, isLoading, isError, error } = useGetItemsQuery()
  const [addToCart, loading] = useMutation(useAddToCartMutation)
  const [removeItem, removeLoading] = useMutation(useRemoveItemMutation)
  const [getUser] = useLazyGetUserQuery()
  const [getItems] = useLazyGetItemsQuery()
  let gTotal = 0
  cartItems.map(item => {
    let value, sTotal
    for (let i = 0; i < itemsQty.length; i++) {
      if (item._id === itemsQty[i].item) value = itemsQty[i].qty
    }
    sTotal = item.price * value
    gTotal += sTotal
  })
  const dec = async (id, qty) => {
    const newQty = qty - 1
    await addToCart('Increasing Quantity', { id, newQty })
    getUser()
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()))
  }
  const inc = async (id, qty, stock) => {
    const newQty = qty + 1
    if (stock <= qty) return toast.error('Maximum Stock Quantity')
    toast.dismiss()
    await addToCart('Decreasing Quantity', { id, newQty })
    getUser()
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()))
  }
  const remove = async id => {
    await removeItem('Removing Item from cart...', id)
    getItems()
      .then(({ data }) => setCartItems(data.items))
      .catch(err => console.log(err))
    getUser()
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()))
  }
  useErrors([{ error, isError }])
  useEffect(() => {
    if (data) setCartItems(data.items)
  }, [data])
  return (
    <>
      {isLoading ? <Loader /> : <>
        <MetaData title={`CART`} />
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
                  <CartItemCard item={item} remove={remove} loading={loading || removeLoading} />
                  <div className="cartInput">
                    <button disabled={value === 1 || loading || removeLoading} onClick={() => dec(item._id, value)}>
                      -
                    </button>
                    <span className='value'>
                      {value}
                    </span>
                    <button disabled={loading || removeLoading} onClick={() => inc(item._id, value, item.stock)}>
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