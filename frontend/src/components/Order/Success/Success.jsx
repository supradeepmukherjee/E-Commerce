import Check from '@mui/icons-material/CheckCircle'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import MetaData from '../../MetaData'
import './Success.css'

const Success = () => {
  return (
    <>
      <MetaData title={`ORDER PLACED`} />
      <div className="success">
        <Check />
        <Typography>
          Your Order has been Placed
        </Typography>
        <Link to={'/myorders'}>
          View Orders
        </Link>
      </div>
    </>
  )
}

export default Success