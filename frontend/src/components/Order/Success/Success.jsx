import Check from '@mui/icons-material/CheckCircle'
import { Typography } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'
import MetaData from '../../MetaData'
import './Success.css'

const Success = () => (
  <>
    <MetaData title={`ORDER PLACED`} />
    <div className="success">
      <Check />
      <Typography>
        Your Order has been Placed
      </Typography>
      <Typography>
        Payment ID: {useSearchParams()[0].get('ref')}
      </Typography>
      <Link to={'/myorders'}>
        View Orders
      </Link>
    </div>
  </>
)

export default Success