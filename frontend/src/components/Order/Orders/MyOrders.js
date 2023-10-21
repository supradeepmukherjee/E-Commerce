import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../../../Actions/Order'
import alert from '../../../alert'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import { DataGrid } from "@mui/x-data-grid";
import Launch from '@mui/icons-material/Launch';
import { Typography } from '@mui/material'
import { loadUser } from '../../../Actions/User'
import { Link } from 'react-router-dom'
import './MyOrders.css'

const MyOrders = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const dispatch = useDispatch()
    const { error: userError, user, loading: userLoading } = useSelector(state => state.user)
    const { loading, error, orders } = useSelector(state => state.order)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            minWidth: 270,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            flex: .5,
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty.',
            type: 'number',
            minWidth: 150,
            flex: .3
        },
        {
            field: 'amt',
            headerName: 'Amount(Rs.)',
            type: 'number',
            minWidth: 270,
            flex: .5
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'number',
            minWidth: 150,
            flex: .5,
            sortable: false,
            renderCell: params => {
                return (
                    <Link to={`/order/${params.row.id}`}>
                        <Launch />
                    </Link>
                )
            }
        },
    ]
    const rows = []
    orders && orders.forEach(item => {
        rows.push({
            id: item._id,
            status: item.orderStatus,
            itemsQty: item.orderedItems.length,
            amt: item.amt
        })
    });
    useEffect(() => {
        dispatch(getMyOrders())
        dispatch(loadUser())
    }, [dispatch])
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
        if (userError) alert('error', setAlertType, userError, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error, userError])
    return (
        <>
            {loading || userLoading ? <Loader /> : <>
                <MetaData title={`MY ORDERS`} />
                <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
                <div className="myOrders">
                    <Typography className='myOrdersHeading'>
                        {user.name}'s Orders
                    </Typography>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                        className='myOrdersTable'
                        autoHeight
                    />
                </div>
            </>}
        </>
    )
}

export default MyOrders