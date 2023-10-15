import { Typography } from '@mui/material'
import Mail from '@mui/icons-material/MailOutline'
import Call from '@mui/icons-material/Call'
import './Contact.css'

const Contact = () => {
    return (
        <div className='contact'>
            <Typography>
                <Mail /> supradeep2004@gmail.com
            </Typography>
            <Typography>
                <Call /> +91-1234567890
            </Typography>
        </div>
    )
}

export default Contact