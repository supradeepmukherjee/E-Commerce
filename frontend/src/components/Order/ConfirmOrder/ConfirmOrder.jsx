import { Typography } from '@mui/material'
import { Country, State } from "country-state-city"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import { useGetItemsQuery } from '../../../redux/api/cart'
import { useGetShipInfoQuery } from '../../../redux/api/user'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import CheckoutSteps from '../CheckoutSteps'
import './ConfirmOrder.css'

const ConfirmOrder = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const navigate = useNavigate()
    const { user } = useSelector(({ auth }) => auth)
    const itemsQty = useSelector(({ auth }) => auth.user.cartItems)
    const [shipInfo, setShipInfo] = useState({})
    const [cartItems, setCartItems] = useState([])
    let gTotal = 0
    cartItems?.map(item => {
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
    const { isLoading, data, error, isError } = useGetShipInfoQuery()
    const { data: itemsData, isLoading: itemsLoading, error: itemsError, isError: itemsIsError } = useGetItemsQuery()
    useErrors([
        { error, isError },
        { error: itemsError, isError: itemsIsError },
    ])
    useEffect(() => {
        if (data) setShipInfo(data.shipInfo)
        if (itemsData) setCartItems(itemsData.items)
    }, [data, itemsData])
    return (
        <>
            {isLoading || itemsLoading ?
                <Loader /> : <>
                    <MetaData title={`CONFIRM ORDER`} />
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
                                            {shipInfo && `${shipInfo.address}, ${shipInfo.city}, ${shipInfo.pincode}, ${State.getStateByCode(shipInfo.state)?.name}, ${Country.getCountryByCode(shipInfo.country)?.name}`}
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
                                <button onClick={() => navigate('/pay')}>
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