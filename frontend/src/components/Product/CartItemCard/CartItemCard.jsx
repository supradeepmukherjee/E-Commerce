import { Link } from 'react-router-dom'
import './CartItemCard.css'

const CartItemCard = ({ item, remove, loading }) => {
    return (
        <>
            <div className="cartItemCard">
                <img src={item.images[0].url} alt={item.name} />
                <div className="">
                    <Link to={`/product/${item._id}`}>
                        {item.name}
                    </Link>
                    <span>
                        Rs. {item.price}
                    </span>
                    <p onClick={() => {
                        if (loading) return
                        else remove(item._id)
                    }}>
                        Remove
                    </p>
                </div>
            </div>
        </>
    )
}

export default CartItemCard