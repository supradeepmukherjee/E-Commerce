import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { delOrder, getOrders } from '../../../Actions/Order'
import alert from '../../../alert'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'

const OrderList = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const dispatch = useDispatch()
  const { loading, orders, error } = useSelector(state => state.order)
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(null)
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
  const rows = []
  orders && orders.forEach(order => {
    rows.push({
      id: order._id,
      status: order.orderStatus,
      itemsQty: order.orderedItems.length,
      amt: order.amt
    })
  });
  const toggle = id => {
    if (open) setOpen(false)
    else {
      setOpen(true)
      setId(id)
    }
  }
  const delHandler = async () => {
    alert('info', setAlertType, 'FORCE Deleting Order. Please wait.', setAlertMsg, setAlertVisibility, dispatch)
    await dispatch(delOrder(id))
    dispatch(getOrders())
    setOpen(false)
  }
  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error])
  return (
    <>
      {loading ? <Loader /> : <>
        <MetaData title={"eCommerce"} />
        <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
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