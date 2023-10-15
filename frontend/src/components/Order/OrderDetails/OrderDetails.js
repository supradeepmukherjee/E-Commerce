import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOneOrder } from '../../../Actions/Order'
import alert from '../../../alert'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import { Country, State } from "country-state-city";
import './OrderDetails.css'
import Error404 from '../../Error404/Error404'

const OrderDetails = () => {
    const dispatch = useDispatch()
    const { loading, error, order } = useSelector(state => state.order)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneOrder(id))
    }, [dispatch, id])
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error])
    return (
        loading ? <Loader /> :
            (order ? <>
                <MetaData title={`ORDER DETAILS`} />
                <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
                <div className="orderDetails">
                    <div className="orderDetailsContainer">
                        <Typography component={'h1'}>
                            Order #{order && order._id}
                        </Typography>
                        <Typography>
                            Shipping Info
                        </Typography>
                        <div className="orderDetailsContainerBox">
                            <div className="">
                                <p>
                                    Name:
                                </p>
                                <span>
                                    {order && order.user.name}
                                </span>
                            </div>
                            <div className="">
                                <p>
                                    Contact No.:
                                </p>
                                <span>
                                    {order && order.shippingInfo.phone}
                                </span>
                            </div>
                            <div className="">
                                <p>
                                    Address:
                                </p>
                                <span>
                                    {order && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.pincode}, ${State.getStateByCode(order.shippingInfo.state).name}, ${Country.getCountryByCode(order.shippingInfo.country).name}`}
                                </span>
                            </div>
                        </div>
                        <Typography>
                            Payment
                        </Typography>
                        <div className="orderDetailsContainerBox">
                            <div className="">
                                <p className={order && order.paymentInfo.status === 'succeeded' ? 'green' : 'red'}>
                                    {order && order.paymentInfo.status === 'succeeded' ? 'PAID' : 'PAYMENT SUCCESSFUL'}
                                </p>
                            </div>
                            <div className="">
                                <p>
                                    Amount:
                                </p>
                                <span>
                                    Rs. {order && order.amt}
                                </span>
                            </div>
                        </div>
                        <Typography>
                            Order Status:
                        </Typography>
                        <div className="orderDetailsContainerBox">
                            <div className="">
                                <p className={order && order.orderStatus === 'Delivered' ? 'green' : 'red'}>
                                    {order && order.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="orderDetailsItems">
                        <Typography>
                            Order Items:
                        </Typography>
                        <div className="orderDetailsItemsContainer">
                            {order && order.orderedItems.map(item => {
                                return (
                                    <div className="" key={item.product}>
                                        <img src={item.img} alt={item.name} />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        <span>
                                            Rs. {item.price} X {item.qty} = <b>Rs. {item.qty * item.price}</b>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
                :
                <Error404 text='Order' />)
    )
}

export default OrderDetails