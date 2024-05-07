import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Scroll from '@mui/icons-material/KeyboardDoubleArrowDown';
import Product from '../Product/ProductCard/Product';
import MetaData from '../MetaData';
import Loader from '../Loader/Loader'
import { getProducts } from '../../Actions/Product';
import Alert from '../Alert';
import alert from '../../alert'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import './Home.css'
import { useGetProductsQuery } from '../../redux/api/product';
import useErrors from '../../hooks/useErrors';

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const dispatch = useDispatch()
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const { data, isError, error, isLoading } = useGetProductsQuery()
    useErrors([{ error, isError }])
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error])
    return (
        <>
            {isLoading ? <Loader /> : <>
                <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
                <MetaData title={'ECOMMERCE'} />
                <div className="banner">
                    <img src={logo} alt="LOGO" />
                    <h1>
                        Find amazing prodcuts below
                    </h1>
                    <a href="#container">
                        <button>
                            Scroll <Scroll />
                        </button>
                    </a>
                </div>
                <h1 className="homeHeading">
                    Featured Products
                </h1>
                <div className="container" id='container'>
                    {products && products.map(({ _id, name, description, price, rating, images, numOfReviews }) => <Product key={_id} id={_id} name={name} desc={description} price={price} rating={rating} imgs={images} reviews={numOfReviews} />)}
                </div>
                <Link to='/products' className='btn'>
                    View All Products
                </Link>
            </>
            }
        </>
    )
}

export default Home