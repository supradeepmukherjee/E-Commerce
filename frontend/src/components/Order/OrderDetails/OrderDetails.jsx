import { Typography } from '@mui/material'
import { Country, State } from "country-state-city"
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAlert from '../../../hooks/useAlert'
import { useGetOneOrderQuery } from '../../../redux/api/order'
import Error404 from '../../Error404/Error404'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import './OrderDetails.css'

const OrderDetails = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const { id } = useParams()
    const [order, setOrder] = useState({})
    const { loading, data, error, isError } = useGetOneOrderQuery(id)
    useAlert([{ error, isError }])
    useEffect(() => {
        if(data) setOrder(data.order)
    }, [data])
    return (
        loading ? <Loader /> :
            (data?.order ? <>
                <MetaData title={`ORDER DETAILS`} />
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