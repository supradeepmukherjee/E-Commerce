import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useMutation from '../../../hooks/useMutation'
import { useForgotPasswordMutation } from '../../../redux/api/user'
import MetaData from '../../MetaData'
import './ForgotPassword.css'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [forgotPassword, loading] = useMutation(useForgotPasswordMutation)
    const formSubmit = async e => {
        e.preventDefault()
        await forgotPassword('Sending Password Link to Registered Email ID', email)
        navigate('/registerlogin')
    }
    return (
        <>
            <MetaData title={'ECOMMERCE'} />
            <div className="forgotPassword">
                <div className="forgotPasswordbox">
                    <h2>
                        Forgot Password
                    </h2>
                    <form className='forgotPasswordform' onSubmit={formSubmit}>
                        <div className="forgotPasswordname">
                            <input type="email" placeholder='Enter registered Email' required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <Link to='/'>
                            Go to Home
                        </Link>
                        <input type="submit" value='Submit' className='forgotPasswordbtn' disabled={loading ? true : false} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword