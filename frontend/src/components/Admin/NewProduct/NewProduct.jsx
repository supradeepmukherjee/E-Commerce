import { Button } from '@mui/base'
import AttachMoney from '@mui/icons-material/AttachMoney'
import AccountTree from '@mui/icons-material/Category'
import Description from '@mui/icons-material/Description'
import Spellcheck from '@mui/icons-material/Spellcheck'
import Storage from '@mui/icons-material/Storage'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useMutation from '../../../hooks/useMutation'
import { useNewProductMutation } from '../../../redux/api/product'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import './NewProduct.css'

const NewProduct = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const [newProduct, loading,] = useMutation(useNewProductMutation)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(null)
    const [images, setImages] = useState([])
    const [imgFiles, setImgFiles] = useState([])
    const imgHandler = e => {
        const files = Array.from(e.target.files)
        if (files.length < 1) return
        setImages([])
        files.forEach(file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setImages(old => [...old, reader.result])
            }
        });
        setImgFiles(files)
    }
    const submitHandler = async e => {
        e.preventDefault()
        const form = new FormData();
        form.set("name", name);
        form.set("price", price);
        form.set("description", description);
        form.set("category", category);
        form.set("stock", stock);
        imgFiles.forEach(f => form.append("files", f))
        if (price < 10) return toast.error('Price of product must be of min. Rs. 10')
        if (price > 99999999) return toast.error('Price of product must be less than Rs 10 crore')
        if (stock > 9999) return toast.error('Stock must be less than 10,000')
        if (stock < 0) return toast.error('Stock must not be negative')
        if (category === '') return toast.error('Please select a category')
        if (images.length === 0) return toast.error('Please upload image(s)')
        await newProduct('Creating New Product', form)
        navigate('/dashboard')
    }
    const categories = ['Laptop', 'Phone', 'Clothes', 'Shoes', 'Camera']
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