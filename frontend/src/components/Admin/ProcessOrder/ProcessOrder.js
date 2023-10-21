import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editOrder, getOneOrder } from '../../../Actions/Order'
import alert from '../../../alert'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import { Country, State } from "country-state-city";
import './ProcessOrder.css'
import AccountTree from '@mui/icons-material/AccountTree'

const ProcessOrder = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { loading, order, error } = useSelector(state => state.order)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [status, setStatus] = useState('')
    const submitHandler = async e => {
        e.preventDefault()
        alert('info', setAlertType, 'Updating Order Status. Please wait', setAlertMsg, setAlertVisibility, dispatch)
        await dispatch(editOrder(id, status))
        navigate('/adminorders')
    }
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error])
    useEffect(() => {
        dispatch(getOneOrder(id))
    }, [dispatch, id])
    return (
        <>
            {loading ? <Loader /> : <>
                <MetaData title={"eCommerce"} />
                <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
                <div className="dashboard">
                    <SideBar />
                    <div className="orderDetails processOrder">
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
                                        Subtotal:
                                    </p>
                                    <span>
                                        Rs. {order && order.itemsSubtotal}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        Shipping Charges:
                                    </p>
                                    <span>
                                        Rs. {order && order.shippingCharge}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        GST:
                                    </p>
                                    <span>
                                        Rs. {order && order.tax}
                                    </span>
                                </div>
                                <div className="">
                                    <p>
                                        Total:
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
                        <form onSubmit={submitHandler} className="newProductForm" style={{ display: order && order.orderStatus === 'Delivered' ? 'none' : '' }}>
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
                    </div>
                </div>
            </>}
        </>
    )
}

export default ProcessOrder