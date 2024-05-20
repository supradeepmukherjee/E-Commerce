import { Typography } from '@mui/material'
import { Country, State } from "country-state-city"
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import { useGetOneOrderQuery } from '../../../redux/api/order'
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
    useErrors([{ error, isError }])
    useEffect(() => {
        if (data) setOrder(data.order)
    }, [data])
    return (
        loading ? <Loader /> :
            <>
                <MetaData title={`ORDER DETAILS`} />
                <div className="orderDetails">
                    <div className="orderDetailsContainer">
                        <Typography component={'h1'}>
                            Order #{order?._id}
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
                                    {order?.user?.name}
                                </span>
                            </div>
                            <div className="">
                                <p>
                                    Contact No.:
                                </p>
                                <span>
                                    {order?.shippingInfo?.phone}
                                </span>
                            </div>
                            <div className="">
                                <p>
                                    Address:
                                </p>
                                <span>
                                    {order?.shippingInfo?.address}, {order?.shippingInfo?.city}, {order?.shippingInfo?.pincode}, {State.getStateByCode(order?.shippingInfo?.state)?.name}, {Country.getCountryByCode(order?.shippingInfo?.country)?.name}
                                </span>
                            </div>
                        </div>
                        <Typography>
                            Payment
                        </Typography>
                        <div className="orderDetailsContainerBox">
                            <div className="">
                                <p>
                                    Status: 
                                </p>
                                <span className={order?.paymentInfo?.status === 'Successful' ? 'green' : 'red'}>
                                    {order?.paymentInfo?.status}
                                </span>
                            </div>
                            <div className="">
                                <p>
                                    Amount:
                                </p>
                                <span>
                                    Rs. {order?.amt}
                                </span>
                            </div>
                        </div>
                        <Typography>
                            Order Status:
                        </Typography>
                        <div className="orderDetailsContainerBox">
                            <div className="">
                                <p className={order?.orderStatus === 'Delivered' ? 'green' : 'red'}>
                                    {order?.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="orderDetailsItems">
                        <Typography>
                            Order Items:
                        </Typography>
                        <div className="orderDetailsItemsContainer">
                            {order?.orderedItems?.map(({ product, name, img, price, qty }) => {
                                return (
                                    <div className="" key={product}>
                                        <img src={img} alt={name} />
                                        <Link to={`/product/${product}`}>
                                            {name}
                                        </Link>
                                        <span>
                                            Rs. {price} X {qty} = <b>Rs. {qty * price}</b>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
    )
}

export default OrderDetails