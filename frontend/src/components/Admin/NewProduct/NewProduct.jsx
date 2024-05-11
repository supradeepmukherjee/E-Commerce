import { Button } from '@mui/base'
import AttachMoney from '@mui/icons-material/AttachMoney'
import AccountTree from '@mui/icons-material/Category'
import Description from '@mui/icons-material/Description'
import Spellcheck from '@mui/icons-material/Spellcheck'
import Storage from '@mui/icons-material/Storage'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadUser } from '../../../Actions/User'
import alert from '../../../alert'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import useMutation from '../../../hooks/useMutation'
import './NewProduct.css'
import { useNewProductMutation } from '../../../redux/api/product'

const NewProduct = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const [newProduct,loading,] = useMutation(useNewProductMutation)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(null)
    const [images, setImages] = useState([])
    const imgHandler = e => {
        const files = Array.from(e.target.files)
        setImages([])
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
        console.log(images)
        const form = new FormData();
        form.set("name", name);
        form.set("price", price);
        form.set("description", description);
        form.set("category", category);
        form.set("stock", stock);
        images.forEach(image => form.append("images", image))
        if (price < 10) return useAlert([], 'error', 'Price of product must be of min. Rs. 10')
        if (price > 99999999) return useAlert([], 'error', 'Price of product must be less than Rs 10 crore')
        if (stock > 9999) return useAlert([], 'error', 'Stock must be less than 10,000')
        if (stock < 0) return useAlert([], 'error', 'Stock must not be negative')
        if (category === '') return useAlert([], 'error', 'Please select a category')
        if (images.length === 0) return useAlert([], 'error', 'Please upload image(s)')
        useAlert([], 'info', 'Creating New Product. Please wait for a minute.')
        await dispatch(newProduct(form))
        navigate('/dashboard')
    }
    const categories = ['Laptop', 'Phone', 'Clothes', 'Shoes', 'Camera']
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error])
    return (
        <>
            <MetaData title={"eCommerce"} />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form onSubmit={submitHandler} className="newProductForm">
                        <h1>
                            Create a New Product
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
                            <select name="category" onChange={e => setCategory(e.target.value)}>
                                <option value="">
                                    Choose Category
                                </option>
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
                            <div>
                                Please Upload 1/more images of size 480X360 px in order to maintain aspect ratio
                            </div>
                            <br />
                            <input type="file" name='images' accept='image/*' onChange={imgHandler} multiple />
                        </div>
                        <div className="newProductImg">
                            {images.map((img, index) => {
                                return <img src={img} key={index} alt="Product Preview" />
                            })
                            }
                        </div>
                        <Button type='submit' disabled={loading} className='newProductBtn'>
                            Create New Product
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewProduct