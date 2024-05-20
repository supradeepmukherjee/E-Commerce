import AccountTree from '@mui/icons-material/AccountTree'
import { Button, Typography } from '@mui/material'
import { Country, State } from "country-state-city"
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import useMutation from '../../../hooks/useMutation'
import { useEditOrderMutation, useGetOneOrderQuery } from '../../../redux/api/order'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import './ProcessOrder.css'

const ProcessOrder = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const navigate = useNavigate()
    const { id } = useParams()
    const [status, setStatus] = useState('')
    const [order, setOrder] = useState({})
    const { isError, error, data, isLoading } = useGetOneOrderQuery(id)
    const [editOrder, loading] = useMutation(useEditOrderMutation)
    const submitHandler = async e => {
        e.preventDefault()
        await editOrder('Updating Order Status', { id, status })
        navigate('/adminorders')
    }
    useErrors([{ error, isError }])
    useEffect(() => {
        if (data) setOrder(data.order)
    }, [data])
    return (
        <>
            {isLoading ? <Loader /> : <>
                <MetaData title={"eCommerce"} />
                <div className="dashboard">
                    <SideBar />
                    <div className="orderDetails processOrder">
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
                                        Subtotal:
                                    </p>
                                    <span>
                                        Rs. {order?.itemsSubtotal}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        Shipping Charges:
                                    </p>
                                    <span>
                                        Rs. {order?.shippingCharge}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        GST:
                                    </p>
                                    <span>
                                        Rs. {order?.tax}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        Total:
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
                        {order?.paymentInfo?.status === 'Successful' &&
                            <form onSubmit={submitHandler} className="newProductForm" style={{ display: order?.orderStatus === 'Delivered' ? 'none' : '' }}>
                                <h1 className='processOrderH1'>
                                    Update Order Status
                                </h1>
                                <div className="">
                                    <AccountTree />
                                    <select value={status} name="status" onChange={e => setStatus(e.target.value)}>
                                        <option value="Shipped">
                                            Shipped
                                        </option>
                                        <option value="Delivered">
                                            Delivered
                                        </option>
                                    </select>
                                </div>
                                <Button type='submit' disabled={loading} className='updateStatusBtn'>
                                    Update Order Status
                                </Button>
                            </form>
                        }
                    </div>
                </div>
            </>}
        </>
    )
}

export default ProcessOrder