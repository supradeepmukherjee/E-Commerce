import Delete from "@mui/icons-material/Delete";
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMutation from "../../../hooks/useMutation";
import profile from '../../../images/profile.png';
import { useDelReviewMutation } from "../../../redux/api/product";
import MetaData from '../../MetaData';
import './ReviewCard.css';

const ReviewCard = ({ review, role, userID, productID, refetch }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const [open, setOpen] = useState(false)
    const [delReview, loading] = useMutation(useDelReviewMutation)
    const toggle = () => {
        if (open) setOpen(false)
        else setOpen(true)
    }
    const delHandler = async () => {
        setOpen(false)
        await delReview('Deleting Review', { productID, id: review._id })
        refetch()
    }
    return (
        <>
            <MetaData title={"eCommerce"} />
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