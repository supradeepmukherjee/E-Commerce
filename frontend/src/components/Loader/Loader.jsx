import { Typography } from '@mui/material'
import './Loader.css'

const Loader = () => {
  return (
    <div className='page'>
      <div className="circle"></div>
      <Typography>
        Please wait. The site is deployed using a free instance on render.com which takes 50 seconds to spin up
      </Typography>
    </div>
  )
}

export default Loader