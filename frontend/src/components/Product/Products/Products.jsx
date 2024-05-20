import { Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import { useLazyGetProductsQuery } from '../../../redux/api/product';
import Loader from '../../Loader/Loader';
import MetaData from '../../MetaData';
import Product from '../ProductCard/Product';
import './Products.css';

const Products = () => {
    const categories = ['Laptop', 'Phone', 'Clothes', 'Shoes', 'Camera']
    const { keyword } = useParams()
    const [currentPg, setCurrentPg] = useState(1)
    const [price, setPrice] = useState([0, 100000])
    const [categoryOption, setCategoryOption] = useState('')
    const [rating, setRating] = useState(0)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [filteredProductsCount, setFilteredProductsCount] = useState(0)
    const [productsCount, setProductsCount] = useState(0)
    const [resultPerPg, setResultPerPg] = useState(0)
    const setCurrentPage = e => setCurrentPg(e)
    const priceHandler = (e, newPrice) => setPrice(newPrice)
    const [getProducts] = useLazyGetProductsQuery()
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])
    useEffect(() => {
        const wait = setTimeout(() => {
            setLoading(true)
            getProducts({ keyword, currentPg, price, category: categoryOption, rating })
                .then(({ data }) => {
                    setProducts(data.products)
                    setFilteredProductsCount(data.filteredProductsCount)
                    setProductsCount(data.productsCount)
                    setResultPerPg(data.resultPerPg)
                })
                .catch(err => console.log(err))
                .finally(setLoading(false))
        }, 1200);
        return () => clearTimeout(wait)
    }, [categoryOption, currentPg, getProducts, keyword, price, rating])
    return (
        <>
            {loading ? <Loader /> : <>
                <MetaData title={'PRODUCTS'} />
                <div className="productsParent">
                    <h2 className="productsHeading">
                        Products
                    </h2>
                    <div className="products">
                        {products?.map(({ _id, name, description, price, rating, images, numOfReviews }) => <Product key={_id} id={_id} name={name} desc={description} price={price} rating={rating} imgs={images} reviews={numOfReviews} />)
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
                        <fieldset className='minRating'>
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