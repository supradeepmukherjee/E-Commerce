import { AccountTree } from '@mui/icons-material'
import AttachMoney from '@mui/icons-material/AttachMoney'
import Description from '@mui/icons-material/Description'
import Spellcheck from '@mui/icons-material/Spellcheck'
import Storage from '@mui/icons-material/Storage'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import useMutation from '../../../hooks/useMutation'
import { useEditProductMutation, useProductDetailsQuery } from '../../../redux/api/product'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'

const EditProduct = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const navigate = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imgFiles, setImgFiles] = useState([])
    const { isError, error, data, isLoading } = useProductDetailsQuery(id)
    const [editProduct, loading] = useMutation(useEditProductMutation)
    const imgHandler = e => {
        const files = Array.from(e.target.files)
        if (files.length < 1) return
        setImages([])
        setOldImages([])
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
        if (images.length === 0) return toast.error('Please upload image(s)')
        await editProduct('Updating Product', { id, data: form })
        navigate('/adminproducts')
    }
    const categories = ['Laptop', 'Phone', 'Clothes', 'Shoes', 'Camera']
    useErrors([{ error, isError }])
    useEffect(() => {
        if (data) {
            setName(data.product.name)
            setDescription(data.product.description)
            setCategory(data.product.category)
            setOldImages(data.product.images)
        }
    }, [data])
    return (
        <>
            {isLoading ? <Loader /> : <>
                <MetaData title={"eCommerce"} />
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