/* eslint-disable array-callback-return */
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import server from "../../../constant"
import useErrors from '../../../hooks/useErrors'
import { useGetItemsQuery } from '../../../redux/api/cart'
import { useGetShipInfoQuery } from '../../../redux/api/user'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import CheckoutSteps from '../CheckoutSteps'
import './Payment.css'

const Payment = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const { user } = useSelector(({ auth }) => auth)
    const itemsQty = useSelector(({ auth }) => auth.user.cartItems)
    const payBtn = useRef(null)
    const { isError, isLoading, data, error } = useGetShipInfoQuery()
    const { isLoading: itemsLoading, data: itemsData, isError: itemsIsError, error: itemsError } = useGetItemsQuery()
    const [loading, setLoading] = useState(false)
    const [shipInfo, setShipInfo] = useState({})
    const [cartItems, setCartItems] = useState([])
    let gTotal = 0
    cartItems.map(item => {
        let value, sTotal
        for (let i = 0; i < itemsQty.length; i++) {
            if (item._id === itemsQty[i].item) value = itemsQty[i].qty
        }
        sTotal = item.price * value
        gTotal += sTotal
    })
    const shippingCharge = gTotal > 499 ? 0 : 100
    const tax = gTotal * .18
    const total = gTotal + tax + shippingCharge
    let orderedItems = []
    let value
    cartItems.map(item => {
        for (let i = 0; i < itemsQty.length; i++) {
            if (item._id === itemsQty[i].item) {
                value = itemsQty[i].qty
                orderedItems.push({
                    name: cartItems[i].name,
                    price: cartItems[i].price,
                    product: cartItems[i]._id,
                    img: cartItems[i].images[0].url,
                    qty: value
                })
            }
        }
    })
    const Order = {
        shippingInfo: shipInfo,
        orderedItems,
        itemsSubtotal: gTotal,
        tax,
        shippingCharge,
        amt: total
    }
    const submitHandler = async e => {
        e.preventDefault()
        setLoading(true)
        payBtn.current.disabled = true
        try {
            const { data: { order } } = await axios.post(`${server}/payment/checkout`,
                { amount: total, order: Order },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            const { data: { key } } = await axios.get(`${server}/payment/key`, { withCredentials: true })
            const rzp = new window.Razorpay({
                key,
                amount: order.amt,
                currency: "INR",
                name: "Supradeep Mukherjee",
                description: "Payment Gateway",
                image: "https://avatars.githubusercontent.com/u/113124882?v=4",
                order_id: order.id,
                callback_url: `${server}/payment/verify`,
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: Order.shippingInfo.phone
                },
                notes: { address: "Razorpay Corporate Office" },
                theme: { color: "#3399cc" }
            })
            rzp.open()
        } catch (err) {
            console.log(err)
            payBtn.current.disabled = false
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (data) setShipInfo(data.shipInfo)
        if (itemsData) setCartItems(itemsData.items)
    }, [data, itemsData])
    useErrors([
        { error, isError },
        { error: itemsError, isError: itemsIsError },
    ])
    return (
        <>
            {itemsLoading || isLoading ? <Loader /> : <>
                <MetaData title={`PAYMENT`} />
                <div className="steps">
                    <CheckoutSteps activeStep={1} />
                </div>
                <div className="payment">
                    <button
                        type="submit"
                        ref={payBtn}
                        disabled={loading}
                        onClick={submitHandler}
                        className='paymentBtn'
                    >
                        {loading ? 'Please Wait...' : `Pay Rs. ${total}`}
                    </button>
                </div>
            </>}
        </>
    )
}

export default Payment