import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import Rating from '@mui/material/Rating'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useParams } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import useMutation from '../../../hooks/useMutation'
import { useAddToCartMutation } from '../../../redux/api/cart'
import { useLazyProductDetailsQuery, useProductDetailsQuery, useSubmitReviewMutation } from '../../../redux/api/product'
import { useLazyGetUserQuery } from "../../../redux/api/user"
import { userExists, userNotExists } from "../../../redux/reducers/auth"
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import ReviewCard from '../Review/ReviewCard'
import './ProductDetails.css'

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [value, setValue] = useState(1)
  const [product, setProduct] = useState({})
  const { user } = useSelector(({ auth }) => auth)
  const [getUser] = useLazyGetUserQuery()
  const [productDetails] = useLazyProductDetailsQuery()
  const { id } = useParams()
  const [addToCart, loading] = useMutation(useAddToCartMutation)
  const [submitReview, reviewLoading] = useMutation(useSubmitReviewMutation)
  const addCartHandler = async () => {
    await addToCart('Adding to Cart', { id: product?._id, qty: value })
    getUser()
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()))
  }
  const reviewToggle = () => open ? setOpen(false) : setOpen(true)
  const submitHandler = async () => {
    reviewToggle()
    await submitReview('Adding Review', { productID: id, rating, comment })
    productDetails(id)
      .then(({ data }) => setProduct(data.product))
      .catch(err => console.log(err))
  }
  const { data, isLoading, error, isError, refetch } = useProductDetailsQuery(id)
  useErrors([{ error, isError }])
  useEffect(() => {
    if (data) setProduct(data.product)
  }, [data])
  return (
    isLoading ? <Loader /> :
      <>
        <div className="productDetails">
          <MetaData title={product?.name} />
          <div className="">
            <Carousel>
              {product?.images?.map((img, i) => {
                return (
                  <div className="" key={i}>
                    <img src={img.url} className='carouselImg' alt="" />
                  </div>
                )
              })}
            </Carousel>
          </div>
          <div className="">
            <div className="detailsBlock1">
              <h2>
                {product?.name}
              </h2>
              <p>
                Product #{product?._id}
              </p>
            </div>
            <div className="detailsBlock2">
              <Rating size={window.innerWidth > 600 ? 'large' : 'small'} value={product && product?.rating} precision={0.5} readOnly /> <span className='detailsBlock2span'>({product?.numOfReviews} reviews)</span>
            </div>
            <div className="detailsBlock3">
              <h1>
                Rs. {product?.price}
              </h1>
              <div className="detailsBlock3-1">
                <div className="detailsBlock3-1-1">
                  <button disabled={value === 1} onClick={() => setValue(value - 1)}>
                    -
                  </button>
                  <span className='value'>
                    {value}
                  </span>
                  <button disabled={product?.stock <= value} onClick={() => setValue(value + 1)}>
                    +
                  </button>
                </div>
                <button onClick={addCartHandler} disabled={loading || product?.stock < 1}>
                  Add to Cart
                </button>
              </div>
              <p>
                Status: <b className={product?.stock < 1 ? 'red' : 'green'}>
                  {product?.stock < 1 ? 'Out of Stock' : 'In Stock'}
                </b>
              </p>
            </div>
            <div className="detailsBlock4">
              Description: <p>{product?.desccription}</p>
            </div>
            <button className='submitReview' onClick={reviewToggle}>
              Submit Review
            </button>
          </div>
        </div>
        <hr />
        <h3 className="reviewHeading">
          Reviews
        </h3>
        <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={reviewToggle}>
          <DialogTitle>
            Submit Review
          </DialogTitle>
          <DialogContent className='reviewBox'>
            <Rating value={rating} onChange={e => setRating(e.target.value)} size='large' />
            <textarea name="" id="" cols="30" rows="5" className='reviewText' value={comment} onChange={e => setComment(e.target.value)}></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={reviewToggle} color='secondary'>
              Close
            </Button>
            <Button color='primary' onClick={submitHandler} disabled={reviewLoading}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {
          product?.reviews?.length > 0 ? (
            <div className="reviews">
              {product?.reviews.map(review => <ReviewCard key={review._id} review={review} role={user?.role} userID={user?._id} productID={id} refetch={refetch} />)}
            </div>
          ) : (
            <p className="noReviews">
              No Reviews Yet
            </p>
          )
        }
      </>
  )
}

export default ProductDetails