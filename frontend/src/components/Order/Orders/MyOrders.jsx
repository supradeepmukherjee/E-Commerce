import Launch from '@mui/icons-material/Launch'
import { Typography } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import { useGetMyOrdersQuery } from '../../../redux/api/order'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import './MyOrders.css'

const MyOrders = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
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
            field: 'payment',
            headerName: 'Payment',
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
    const [rows, setRows] = useState([])
    const { user } = useSelector(({ auth }) => auth)
    const { isError, data, error, isLoading } = useGetMyOrdersQuery()
    useErrors([{ error, isError }])
    useEffect(() => {
        if (data) setRows(data.orders.map(({ _id, orderStatus, orderedItems, amt, paymentInfo }) => ({
            id: _id,
            status: orderStatus,
            itemsQty: orderedItems.length,
            payment: paymentInfo.status,
            amt,
        })))
    }, [data])
    return (
        <>
            {isLoading ? <Loader /> : <>
                <MetaData title={`MY ORDERS`} />
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