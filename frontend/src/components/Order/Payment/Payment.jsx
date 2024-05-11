/* eslint-disable array-callback-return */
import Card from "@mui/icons-material/CreditCard"
import Event from "@mui/icons-material/Event"
import VPN from "@mui/icons-material/VpnKey"
import { Typography } from '@mui/material'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from 'axios'
import { State } from "country-state-city"
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { newOrder } from '../../../Actions/Order'
import useAlert from '../../../hooks/useAlert'
import { useGetItemsQuery } from '../../../redux/api/cart'
import { useGetMyOrdersQuery } from '../../../redux/api/order'
import { useGetShipInfoQuery } from '../../../redux/api/user'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import CheckoutSteps from '../CheckoutSteps'
import './Payment.css'

const Payment = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const { error: userError, user, loading: userLoading } = useSelector(state => state.user)
    const itemsQty = useSelector(state => state.user.user.cartItems)
    const payBtn = useRef(null)
    const { isLoading, data, isError, error } = useGetMyOrdersQuery()
    const { isLoading: itemsLoading, data: itemsData, isError: itemsIsError, error: itemsError } = useGetItemsQuery()
    const { isError: shipIsError, isLoading: shipLoading, data: shipData, error: shipError } = useGetShipInfoQuery()
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
        try {
            useAlert([], 'info', 'Processing payment. Please don\'t refresh or close the tab or press back button.')
            const { data } = await axios.post(`/api/v1/processpayment`, { amt: Math.round(total * 100) }, { headers: { 'Content-Type': 'application/json' } })
            const clientSecret = data.clientSecret
            if (!stripe || !elements) return
            useAlert([], 'info', 'Processing payment. Please don\'t refresh or close the tab or press back button.')
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
                useAlert([], 'error', result.error.message)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    useAlert([], 'info', 'Processing payment. Please don\'t refresh or close the tab or press back button.')
                    await dispatch(newOrder(order))
                    navigate('/success')
                } else {
                    useAlert([], 'error', 'There\'s some issue while processing the payment. Please retry.')
                }
            }
        } catch (err) {
            console.log(err)
            payBtn.current.disabled = false
        }
    }
    useEffect(() => {
        if(shipData) setShipInfo(data.shipInfo)
        if(itemsData) setCartItems(itemsData.items)
    }, [data.shipInfo, dispatch, error, itemsData, shipData, shipError, userError])
    useAlert([
        { error, isError },
        { error: itemsError, isError: itemsIsError },
        { error: shipError, isError: shipIsError },
    ])
    return (
        <>
            {isLoading || itemsLoading || shipLoading || userLoading ? <Loader /> : <>
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
                            className='paymentFormBtn'
                        />
                    </form>
                </div>
            </>}
        </>
    )
}

export default Payment