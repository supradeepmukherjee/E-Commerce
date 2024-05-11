import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import './Product.css'

const Product = ({ name, price, rating, imgs, id, reviews }) => {
    return (
        <Link className='product' to={`/product/${id}`}>
            <img src={imgs[0].url} alt={name} />
            <p>
                {name}
            </p>
            <div className="">
                <Rating size='small' value={rating} precision={0.5} readOnly /> <span className='span'>({reviews} reviews)</span>
            </div>
            <span>
                Rs. {price}
            </span>
        </Link>
    )
}

export default Product