import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'
import { getProducts } from '../../../Actions/Product';
import Product from './../ProductCard/Product';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import './Products.css'
import { Slider, Typography } from '@mui/material';
import Alert from '../../Alert';
import MetaData from '../../MetaData';
import alert from '../../../alert';

const Products = () => {
    const categories = ['Laptop', 'Phone', 'Clothes', 'Shoes', 'Camera']
    const dispatch = useDispatch()
    const { keyword } = useParams()
    const [currentPg, setCurrentPg] = useState(1)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [price, setPrice] = useState([0, 100000])
    const [categoryOption, setCategoryOption] = useState('')
    const [rating, setRating] = useState(0)
    const { loading, products, filteredProductsCount, productsCount, resultPerPg, error } = useSelector(state => state.products)
    const setCurrentPage = e => setCurrentPg(e)
    const priceHandler = (e, newPrice) => setPrice(newPrice)
    useEffect(() => {
        dispatch(getProducts(keyword, currentPg, price, categoryOption, rating))
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [categoryOption, currentPg, dispatch, keyword, price, rating])
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error])
    return (
        <>
            {loading ? <Loader /> : <>
                <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
                <MetaData title={'PRODUCTS'} />
                <div className="productsParent">
                    <h2 className="productsHeading">
                        Products
                    </h2>
                    <div className="products">
                        {products && products.map(({ _id, name, description, price, rating, images, numOfReviews }) => <Product key={_id} id={_id} name={name} desc={description} price={price} rating={rating} imgs={images} reviews={numOfReviews} />)
                        }
                        {!filteredProductsCount && <Typography>
                            No Products to show
                        </Typography>}
                    </div>
                    <div className="filterBox">
                        <Typography className='priceHeading'>
                            Filter Price
                        </Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='on'
                            aria-labelledby='range-slider'
                            min={0}
                            max={100000} />
                        <Typography className='categoryHeading'>
                            Categories
                        </Typography>
                        <ul className="categoryBox">
                            {categories.map(category =>
                                <li className='categoryLink' key={category} onClick={() => setCategoryOption(category)} >
                                    {category}
                                </li>
                            )}
                        </ul>
                        <fieldset>
                            <Typography component='legend'>
                                Min. Rating
                            </Typography>
                            <Slider
                                value={rating}
                                onChange={(e, newRating) => setRating(newRating)}
                                aria-labelledby='continuous-slider'
                                min={0}
                                max={5}
                                valueLabelDisplay='auto' />
                        </fieldset>
                    </div>
                    {resultPerPg <= filteredProductsCount && <div className="paginationBox">
                        <Pagination
                            activePage={currentPg}
                            itemsCountPerPage={resultPerPg}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPage}
                            nextPageText='Next'
                            prevPageText='Prev'
                            firstPageText='First'
                            lastPageText='Last'
                            itemClass='pgItem'
                            linkClass='pgLink'
                            activeClass='pgItemActive'
                            activeLinkClass='pgLinkActive' />
                    </div>
                    }
                </div>
            </>}
        </>
    )
}

export default Products