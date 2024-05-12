import Delete from "@mui/icons-material/Delete"
import Edit from "@mui/icons-material/Edit"
import Launch from '@mui/icons-material/Launch'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useErrors from "../../../hooks/useErrors"
import useMutation from "../../../hooks/useMutation"
import { useDelProductMutation, useGetMyProductsQuery, useLazyGetMyProductsQuery } from '../../../redux/api/product'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import './ProductList.css'

const ProductList = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const { isLoading, data, error, isError } = useGetMyProductsQuery()
    const [delProduct, loading] = useMutation(useDelProductMutation)
    const [getProducts] = useLazyGetMyProductsQuery()
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
        await delProduct('Deleting Product', id)
        getProducts()
            .then(({ data }) => setRows(data.products.map(product => ({
                id: product._id,
                name: product.name,
                stock: product.stock,
                price: product.price
            }))))
            .catch(err => console.log(err))
    }
    useErrors([{ error, isError }])
    useEffect(() => {
        if (data) setRows(data.products.map(product => ({
            id: product._id,
            name: product.name,
            stock: product.stock,
            price: product.price
        })));
    }, [data])
    return (
        <>
            {isLoading ? <Loader /> : <>
                <MetaData title={"eCommerce"} />
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