import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useMutation from '../../../hooks/useMutation'
import { useResetPasswordMutation } from '../../../redux/api/user'
import { passwordValidator } from '../../../utils/validators'
import MetaData from '../../MetaData'
import './ResetPassword.css'

const ResetPassword = () => {
    const [pass, setPass] = useState('')
    const [cpass, setcPass] = useState('')
    const { user } = useSelector(({ auth }) => auth)
    const { token } = useParams()
    const [resetPassword, loading] = useMutation(useResetPasswordMutation)
    const navigate = useNavigate()
    const formSubmit = async e => {
        e.preventDefault()
        let validationMsg = ''
        if (pass !== cpass) return toast.error('Passwords don\'t match')
        validationMsg = passwordValidator(pass) || ''
        if (validationMsg !== '') return toast.error(validationMsg)
        toast.dismiss()
        await resetPassword('Resetting Password', { token, password: pass })
        navigate('/registerlogin')
    }
    useEffect(() => {
        if (user) return navigate('/')
    }, [navigate, user])
    return (
        <>
            <MetaData title={'RESET PASSWORD'} />
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
                        <input type="submit" value='Submit' className='resetPasswordbtn' disabled={loading} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword