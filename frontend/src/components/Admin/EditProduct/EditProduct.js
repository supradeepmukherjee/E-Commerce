import { AccountTree } from '@mui/icons-material'
import AttachMoney from '@mui/icons-material/AttachMoney'
import Description from '@mui/icons-material/Description'
import Spellcheck from '@mui/icons-material/Spellcheck'
import Storage from '@mui/icons-material/Storage'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editProduct, productDetails } from '../../../Actions/Product'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import alert from '../../../alert'
import useErrors from '../../../hooks/useErrors'
import { useProductDetailsQuery } from '../../../redux/api/product'

const EditProduct = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const { id } = useParams()
    const [name, setName] = useState("");
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(null);
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const { isError, error, data, isLoading } = useProductDetailsQuery(id)
    const imgHandler = e => {
        const files = Array.from(e.target.files)
        setImages([])
        setOldImages([])
        files.forEach(file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(old => [...old, reader.result])
                }
            }
        });
    }
    const submitHandler = async e => {
        e.preventDefault()
        const form = new FormData();
        form.set("name", name);
        form.set("price", price);
        form.set("description", description);
        form.set("category", category);
        form.set("stock", stock);
        images.forEach(image => form.append("images", image))
        if (price < 10) return alert('error', setAlertType, 'Price of product must be of min. Rs. 10', setAlertMsg, setAlertVisibility, dispatch)
        if (price > 99999999) return alert('error', setAlertType, 'Price of product must be less than Rs 10 crore', setAlertMsg, setAlertVisibility, dispatch)
        if (stock > 9999) return alert('error', setAlertType, 'Stock must be less than 10,000', setAlertMsg, setAlertVisibility, dispatch)
        if (stock < 0) return alert('error', setAlertType, 'Stock must not be negative', setAlertMsg, setAlertVisibility, dispatch)
        if (images.length === 0) return alert('error', setAlertType, 'Please upload image(s)', setAlertMsg, setAlertVisibility, dispatch)
        alert('info', setAlertType, 'Creating New Product. Please wait for a minute.', setAlertMsg, setAlertVisibility, dispatch)
        await dispatch(editProduct(id, form))
        navigate('/adminproducts')
    }
    const categories = ['Laptop', 'Phone', 'Clothes', 'Shoes', 'Camera']
    useErrors([{ error, isError }])
    useEffect(() => {
        if (productDetail) {
            setName(productDetail.name)
            setDescription(productDetail.description)
            setCategory(productDetail.category)
            setOldImages(productDetail.images)
        }
    }, [productDetail])
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
        if (productError) alert('error', setAlertType, productError, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error, productError])
    return (
        <>
            {isLoading ? <Loader /> : <>
                <MetaData title={"eCommerce"} />
                <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
                <div className="dashboard">
                    <SideBar />
                    <div className="newProductContainer">
                        <form onSubmit={submitHandler} className="newProductForm">
                            <h1>
                                Update Product
                            </h1>
                            <div className="">
                                <Spellcheck />
                                <input type="text" placeholder='Name' required name='name' value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="">
                                <AttachMoney />
                                <input type="number" placeholder='Price(in Rs.)' required name='price' value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div className="">
                                <Description />
                                <input type="text" placeholder='Description' required name='description' value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className="">
                                <AccountTree />
                                <select value={category} name="category" onChange={e => setCategory(e.target.value)}>
                                    {categories.map(category => {
                                        return (
                                            <option value={category} key={category}>
                                                {category}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="">
                                <Storage />
                                <input type="number" placeholder='Stock' required name='stock' value={stock} onChange={e => setStock(e.target.value)} />
                            </div>
                            <div className="newProductFile">
                                <input type="file" name='images' accept='image/*' onChange={imgHandler} multiple />
                            </div>
                            <div className="newProductImg">
                                {images.map((img, index) => {
                                    return <img src={img} key={index} alt="Product Preview" />
                                })
                                }
                            </div>
                            <div className="newProductImg">
                                {oldImages.map(img => {
                                    return <img src={img.url} key={img._id} alt="Product Preview" />
                                })
                                }
                            </div>
                            <Button type='submit' disabled={loading} className='newProductBtn'>
                                Update Product
                            </Button>
                        </form>
                    </div>
                </div>
            </>}
        </>
    )
}

export default EditProduct