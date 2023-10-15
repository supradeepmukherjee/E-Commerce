import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delProduct, getMyProducts } from '../../../Actions/Product'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import { DataGrid } from "@mui/x-data-grid";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Launch from '@mui/icons-material/Launch'
import { Link } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import alert from '../../../alert'
import SideBar from '../SideBar/SideBar'
import './ProductList.css'

const ProductList = () => {
    const dispatch = useDispatch() 
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const { loading, products, error } = useSelector(state => state.products)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const columns = [
        {
            field: 'id',
            headerName: 'Product ID',
            minWidth: 270,
            flex: 1,
            renderCell: params => {
                return (
                    <>
                        {params.row.id}
                        <Link to={`/product/${params.row.id}`}>
                            <Launch />
                        </Link>
                    </>
                )
            }
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 150,
            flex: .5,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            minWidth: 150,
            flex: .3
        },
        {
            field: 'price',
            headerName: 'Price',
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
                        <Link to={`/adminproduct/${params.row.id}`}>
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
    products && products.forEach(product => {
        rows.push({
            id: product._id,
            name: product.name,
            stock: product.stock,
            price: product.price
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
        alert('info', setAlertType, 'Deleting Product. Please wait.', setAlertMsg, setAlertVisibility, dispatch)
        await dispatch(delProduct(id))
        dispatch(getMyProducts())
        setOpen(false)
    }
    useEffect(() => {
        dispatch(getMyProducts())
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
                            My Products
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
                        Are you sure you want to Delete this Product?
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

export default ProductList