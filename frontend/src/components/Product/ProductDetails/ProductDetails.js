import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails, submitReview } from '../../../Actions/Product'
import { addToCart } from '../../../Actions/Cart'
import { useParams } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import ReviewCard from '../Review/ReviewCard'
import Alert from '../../Alert'
import MetaData from '../../MetaData'
import alert from '../../../alert'
import { loadUser } from '../../../Actions/User'
import Rating from '@mui/material/Rating'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductDetails.css'
import Error404 from '../../Error404/Error404'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { loading, productDetails: product, error } = useSelector(state => state.productDetails)
  const { loading: cartLoading, msg, error: cartError } = useSelector(state => state.productDetails)
  const { error: userError, user } = useSelector(state => state.user)
  const { error: reviewError } = useSelector(state => state.review)
  const { id } = useParams()
  const [value, setValue] = useState(1)
  const addCartHandler = async () => {
    alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
    await dispatch(addToCart(product._id, value))
    await dispatch(loadUser())
    alert('success', setAlertType, 'Item added to Cart', setAlertMsg, setAlertVisibility, dispatch)
  }
  const reviewToggle = () => open ? setOpen(false) : setOpen(true)
  const submitHandler = async () => {
    await dispatch(submitReview(id, rating, comment))
    reviewToggle()
    dispatch(productDetails(id))
  }
  useEffect(() => {
    dispatch(productDetails(id))
  }, [dispatch, id])
  useEffect(() => {
    if (msg) alert('success', setAlertType, msg, setAlertMsg, setAlertVisibility, dispatch)
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    if (cartError) alert('error', setAlertType, cartError, setAlertMsg, setAlertVisibility, dispatch)
    if (reviewError) alert('error', setAlertType, reviewError, setAlertMsg, setAlertVisibility, dispatch)
    if (userError) alert('error', setAlertType, userError, setAlertMsg, setAlertVisibility, dispatch)
  }, [cartError, dispatch, error, msg, reviewError, userError])
  return (
    loading ? <Loader /> :
      (product ? <>
        <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
        <div className="productDetails">
          <MetaData title={product.name} />
          <div className="">
            <Carousel>
              {product.images.map(img => {
                return (
                  <div className="">
                    <img src={img.url} className='carouselImg' key={img.url} alt="" />
                  </div>
                )
              })}
            </Carousel>
          </div>
          <div className="">
            <div className="detailsBlock1">
              <h2>
                {product.name}
              </h2>
              <p>
                Product #{product._id}
              </p>
            </div>
            <div className="detailsBlock2">
              <Rating size={window.innerWidth > 600 ? 'large' : 'small'} value={product && product.rating} precision={0.5} readOnly /> <span className='detailsBlock2span'>({product.numOfReviews} reviews)</span>
            </div>
            <div className="detailsBlock3">
              <h1>
                Rs. {product.price}
              </h1>
              <div className="detailsBlock3-1">
                <div className="detailsBlock3-1-1">
                  <button disabled={value === 1} onClick={() => setValue(value - 1)}>
                    -
                  </button>
                  <span className='value'>
                    {value}
                  </span>
                  <button disabled={product.stock <= value} onClick={() => setValue(value + 1)}>
                    +
                  </button>
                </div>
                <button onClick={addCartHandler} disabled={cartLoading || product.stock < 1}>
                  Add to Cart
                </button>
              </div>
              <p>
                Status: <b className={product.stock < 1 ? 'red' : 'green'}>
                  {product.stock < 1 ? 'Out of Stock' : 'In Stock'}
                </b>
              </p>
            </div>
            <div className="detailsBlock4">
              Description: <p>{product.desccription}</p>
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
            <Button color='primary' onClick={submitHandler}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {product.reviews[0] ? (
          <div className="reviews">
            {product.reviews.map(review => <ReviewCard key={review._id} review={review} role={user && user.role} userID={user && user._id} productID={id} />)}
          </div>
        ) : (
          <p className="noReviews">
            No Reviews Yet
          </p>
        )}
      </>
        :
        <Error404 text='Product' />)
  )
}

export default ProductDetails