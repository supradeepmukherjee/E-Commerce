import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { resetPassword } from '../../../Actions/User'
import alert from '../../../alert'
import Alert from '../../Alert'
import MetaData from '../../MetaData'
import './ResetPassword.css'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const { error, msg, loading } = useSelector(state => state.password)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [pass, setPass] = useState('')
    const [cpass, setcPass] = useState('')
    const { token } = useParams()
    const formSubmit = e => {
        e.preventDefault()
        if (pass === cpass) {
            dispatch(resetPassword(token, pass))
            alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
        }
        else alert('Passwords do not match')
    }
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
        if (msg) alert('success', setAlertType, msg, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error, msg])
    return (
        <>
            <MetaData title={'RESET PASSWORD'} />
            <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
            <div className="resetPassword">
                <div className="resetPasswordbox">
                    <h2>
                        Reset Password
                    </h2>
                    <form className='resetPasswordform' onSubmit={formSubmit}>
                        <div className="resetPasswordname">
                            <input type="password" placeholder='Enter New Password' required value={pass} onChange={e => setPass(e.target.value)} />
                        </div>
                        <div className="resetPasswordname">
                            <input type="password" placeholder='Confirm New Password' required value={cpass} onChange={e => setcPass(e.target.value)} />
                        </div>
                        <Link to={'/forgotPassword'}>
                            Resend Password Reset Link
                        </Link>
                        <Link to={'/registerlogin'}>
                            Login
                        </Link>
                        <input type="submit" value='Submit' className='resetPasswordbtn' disabled={loading ? true : false} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword