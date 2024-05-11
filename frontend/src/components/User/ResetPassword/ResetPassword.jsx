import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAlert from '../../../hooks/useAlert'
import useMutation from '../../../hooks/useMutation'
import { useResetPasswordMutation } from '../../../redux/api/user'
import { passwordValidator } from '../../../utils/validators'
import MetaData from '../../MetaData'
import './ResetPassword.css'

const ResetPassword = () => {
    const [pass, setPass] = useState('')
    const [cpass, setcPass] = useState('')
    const { token } = useParams()
    const [resetPassword, loading] = useMutation(useResetPasswordMutation)
    const navigate = useNavigate()
    const formSubmit = async e => {
        e.preventDefault()
        let validationMsg = ''
        if (pass === cpass) {
            validationMsg = passwordValidator(pass) || ''
            if (validationMsg !== '') return useAlert([], 'error', validationMsg)
            await resetPassword('Resetting Password', { token, password: pass })
            navigate('/registerlogin')
        }
        else return useAlert([], 'error', 'Passwords do not match')
    }
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