import Scroll from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useErrors from '../../hooks/useErrors';
import logo from '../../images/logo.png';
import { useGetProductsQuery } from '../../redux/api/product';
import Loader from '../Loader/Loader';
import MetaData from '../MetaData';
import Product from '../Product/ProductCard/Product';
import './Home.css';

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const { data, isError, error, isLoading } = useGetProductsQuery({})
    useErrors([{ error, isError }])
    return (
        <>
            {isLoading ? <Loader /> : <>
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
                    {data?.products?.map(({ _id, name, description, price, rating, images, numOfReviews }) => <Product key={_id} id={_id} name={name} desc={description} price={price} rating={rating} imgs={images} reviews={numOfReviews} />)}
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