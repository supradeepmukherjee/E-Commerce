import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import useMutation from '../../../hooks/useMutation'
import { useDelOrderMutation, useGetAdminOrdersQuery, useLazyGetAdminOrdersQuery } from '../../../redux/api/order'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'

const OrderList = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(null)
  const [delOrder, loading] = useMutation(useDelOrderMutation)
  const [getOrders] = useLazyGetAdminOrdersQuery()
  const { isError, isLoading, data, error } = useGetAdminOrdersQuery()
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
          <>
            <Link to={`/adminorder/${params.row.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => toggle(params.row.id)}>
              <Delete />
            </Button>
          </>
        )
      }
    },
  ]
  const [rows, setRows] = useState([])
  const toggle = id => {
    if (open) setOpen(false)
    else {
      setOpen(true)
      setId(id)
    }
  }
  const delHandler = async () => {
    setOpen(false)
    await delOrder('Deleting Order...', id)
    getOrders()
      .then(({ data }) => setRows(data.orders.map(({ _id, orderStatus, orderedItems, amt, paymentInfo }) => ({
        id: _id,
        status: orderStatus,
        itemsQty: orderedItems.length,
        payment: paymentInfo.status,
        amt,
      }))))
      .catch(err => console.log(err))
  }
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
        <MetaData title={"eCommerce"} />
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 className="productListHeading">
              Orders to be fulfilled
            </h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              className='productListTable'
              autoHeight
            />
          </div>
        </div>
        <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={toggle}>
          <DialogTitle>
            Are you sure you want to FORCE Cancel this Order?
          </DialogTitle>
          <DialogActions>
            <Button onClick={toggle} color='secondary'>
              Close
            </Button>
            <Button disabled={loading} color='primary' onClick={delHandler}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>}
    </>
  )
}

export default OrderList