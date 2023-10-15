import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../../Actions/User'
import alert from '../../../alert'
import Alert from '../../Alert'
import MetaData from '../../MetaData'
import './ForgotPassword.css'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const { error, msg, loading } = useSelector(state => state.password)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [email, setEmail] = useState('')
    const formSubmit = e => {
        e.preventDefault()
        dispatch(forgotPassword(email))
        alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
    }
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
        if (msg) alert('success', setAlertType, msg, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error, msg])
    return (
        <>
            <MetaData title={'ECOMMERCE'} />
            <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
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