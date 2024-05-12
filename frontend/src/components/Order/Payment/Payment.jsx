/* eslint-disable array-callback-return */
import Card from "@mui/icons-material/CreditCard"
import Event from "@mui/icons-material/Event"
import VPN from "@mui/icons-material/VpnKey"
import { Typography } from '@mui/material'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from 'axios'
import { State } from "country-state-city"
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import server from "../../../constant"
import useErrors from '../../../hooks/useErrors'
import useMutation from "../../../hooks/useMutation"
import { useGetItemsQuery } from '../../../redux/api/cart'
import { useNewOrderMutation } from '../../../redux/api/order'
import { useGetShipInfoQuery } from '../../../redux/api/user'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import CheckoutSteps from '../CheckoutSteps'
import './Payment.css'

const key = import.meta.env.VITE_STRIPE
const Payment = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const { user } = useSelector(({ auth }) => auth)
    const itemsQty = useSelector(({ auth }) => auth.user.cartItems)
    const payBtn = useRef(null)
    const { isError, isLoading, data, error } = useGetShipInfoQuery()
    const { isLoading: itemsLoading, data: itemsData, isError: itemsIsError, error: itemsError } = useGetItemsQuery()
    const [newOrder, orderLoading] = useMutation(useNewOrderMutation)
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
    const order = {
        shippingInfo: shipInfo,
        orderedItems,
        itemsSubtotal: gTotal,
        tax,
        shippingCharge,
        amt: total
    }
    const submitHandler = async e => {
        e.preventDefault()
        payBtn.current.disabled = true
        const id = toast.loading('Processing payment. Please don\'t refresh or close the tab or press back button.')
        try {
            const { data } = await axios.post(`${server}/payment/processpayment`,
                { amt: Math.round(total * 100) },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${key}`,
                    },
                    withCredentials: true
                })
            const clientSecret = data.clientSecret
            if (!stripe || !elements) return
            toast.loading('Processing payment. Please don\'t refresh or close the tab or press back button.', { id })
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shipInfo.address,
                            city: shipInfo.city,
                            state: State.getStateByCode(shipInfo.state).name,
                            country: shipInfo.country,
                            postal_code: shipInfo.pincode
                        }
                    }
                }
            })
            if (result.error) {
                payBtn.current.disabled = false
                toast.error(result.error.message, { id })
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    toast.error('Processing payment. Please don\'t refresh or close the tab or press back button.', { id })
                    await newOrder('Placing Order', order)
                    navigate('/success')
                } else {
                    toast.error('There\'s some issue while processing the payment. Please retry.', { id })
                }
            }
        } catch (err) {
            console.log(err)
            payBtn.current.disabled = false
            toast.error('Something went wrong', { id })
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
                    <form className="paymentForm" onSubmit={submitHandler}>
                        <Typography>
                            Card Info
                        </Typography>
                        <div className="">
                            <Card />
                            <CardNumberElement className='paymentInput' />
                        </div>
                        <div className="">
                            <Event />
                            <CardExpiryElement className='paymentInput' />
                        </div>
                        <div className="">
                            <VPN />
                            <CardCvcElement className='paymentInput' />
                        </div>
                        <input
                            type="submit"
                            value={`Pay Rs. ${total}`}
                            ref={payBtn}
                            disabled={orderLoading}
                            className='paymentFormBtn'
                        />
                    </form>
                </div>
            </>}
        </>
    )
}

export default Payment