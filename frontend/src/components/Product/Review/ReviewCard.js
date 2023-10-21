import './ReviewCard.css'
import Rating from '@mui/material/Rating'
import profile from '../../../images/profile.png'
import Delete from "@mui/icons-material/Delete";
import { Link } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react';
import alert from '../../../alert'
import Alert from '../../Alert'
import MetaData from '../../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { delReview, productDetails } from '../../../Actions/Product';

const ReviewCard = ({ review, role, userID, productID }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const [open, setOpen] = useState(false)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const { error, loading, msg } = useSelector(state => state.review)
    const dispatch = useDispatch()
    const toggle = () => {
        if (open) setOpen(false)
        else setOpen(true)
    }
    const delHandler = async () => {
        alert('info', setAlertType, 'Deleting Review. Please wait.', setAlertMsg, setAlertVisibility, dispatch)
        await dispatch(delReview(productID, review._id))
        dispatch(productDetails(productID))
        setOpen(false)
    }
    useEffect(() => {
        if (msg) alert('success', setAlertType, msg, setAlertMsg, setAlertVisibility, dispatch)
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error, msg])
    return (
        <>
            <MetaData title={"eCommerce"} />
            <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
            <div className='reviewCard'>
                <img src={profile} alt="" />
                {role === 'Admin' ?
                    <Link to={`/adminuser/${userID}`}>
                        <p>
                            {review.name}
                        </p>
                    </Link>
                    :
                    <p>
                        {review.name}
                    </p>
                }
                <Rating size={window.innerWidth > 600 ? 'large' : 'medium'} value={review.rating} precision={0.5} readOnly />
                <br />
                <span className='reviewCardSpan'>
                    {review.comment}
                </span>
                <br />
                {review.user === userID ?
                    <Button style={{ color: 'red' }} onClick={toggle}>
                        <Delete />
                    </Button>
                    : ''}
            </div>
            <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={toggle}>
                <DialogTitle>
                    Are you sure you want to Delete your Review?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={toggle} color='secondary'>
                        Close
                    </Button>
                    <Button disabled={loading} color='primary' onClick={delHandler}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ReviewCard