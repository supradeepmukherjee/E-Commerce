import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getItems } from '../../../Actions/Cart'
import { getShipInfo, loadUser } from '../../../Actions/User'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import CheckoutSteps from '../CheckoutSteps'
import alert from '../../../alert'
import { Country, State } from "country-state-city";
import './ConfirmOrder.css'

const ConfirmOrder = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error: userError, user, loading: userLoading } = useSelector(state => state.user)
    const { loading, error, cartItems } = useSelector(state => state.cartItems)
    const { shipInfo, error: shipError } = useSelector(state => state.ship)
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
    const shippingCharges = gTotal > 499 ? 0 : 100
    const tax = gTotal * .18
    const total = gTotal + tax + shippingCharges
    const pay = () => navigate('/pay')
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
        if (userError) alert('error', setAlertType, userError, setAlertMsg, setAlertVisibility, dispatch)
        if (shipError) alert('error', setAlertType, shipError, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error, shipError, userError])
    useEffect(() => {
        dispatch(loadUser())
        dispatch(getItems())
        dispatch(getShipInfo())
    }, [dispatch])
    return (
        <>
            {loading || userLoading ? <Loader /> : <>
                <MetaData title={`CONFIRM ORDER`} />
                <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
                <div className="steps">
                    <CheckoutSteps activeStep={1} />
                </div>
                <div className="confirmOrder">
                    <div className="">
                        <div className="confirmShippingArea">
                            <Typography>
                                Shipping Info
                            </Typography>
                            <div className="confirmShippingAreaBox">
                                <div className="">
                                    <p>
                                        Name:
                                    </p>
                                    <span>
                                        {user.name}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        Phone:
                                    </p>
                                    <span>
                                        {shipInfo && shipInfo.phone}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        Address:
                                    </p>
                                    <span>
                                        {shipInfo && `${shipInfo.address}, ${shipInfo.city}, ${shipInfo.pincode}, ${State.getStateByCode(shipInfo.state).name}, ${Country.getCountryByCode(shipInfo.country).name}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="confirmCartItems">
                            <Typography>
                                Your Cart Items:
                            </Typography>
                            <div className="confirmCartItemsContainer">
                                {cartItems && cartItems.map(item => {
                                    let value, sTotal
                                    for (let i = 0; i < itemsQty.length; i++) {
                                        if (item._id === itemsQty[i].item) value = itemsQty[i].qty
                                    }
                                    sTotal = item.price * value
                                    return (
                                        <div className="" key={item._id}>
                                            <img src={item.images[0].url} alt={item.name} />
                                            <Link to={`/product/${item._id}`}>
                                                {item.name}
                                            </Link>
                                            <span>
                                                Rs.{item.price} X {value} =<b> Rs.{sTotal}</b>
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="orderSummary">
                            <Typography>
                                Order Summary
                            </Typography>
                            <div className="">
                                <div className="">
                                    <p>
                                        Subtotal:
                                    </p>
                                    <span>
                                        Rs. {gTotal}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        Shipping Charges:
                                    </p>
                                    <span>
                                        Rs. {shippingCharges}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        GST:
                                    </p>
                                    <span>
                                        Rs. {tax}
                                    </span>
                                </div>
                            </div>
                            <div className="orderSummaryTotal">
                                <p>
                                    <b>
                                        Total:
                                    </b>
                                </p>
                                <span>
                                    <b>
                                        Rs. {total}
                                    </b>
                                </span>
                            </div>
                            <button onClick={pay}>
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default ConfirmOrder