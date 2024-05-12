import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import useMutation from '../../../hooks/useMutation'
import { useChangePasswordMutation } from '../../../redux/api/user'
import { passwordValidator } from '../../../utils/validators'
import MetaData from '../../MetaData'
import './ChangePassword.css'

const ChangePassword = () => {
    const [old, setOld] = useState('')
    const [newP, setNewP] = useState('')
    const [cPass, setCPass] = useState('')
    const navigate = useNavigate()
    const [changePassword, pLoading] = useMutation(useChangePasswordMutation)
    const formSubmit = async e => {
        e.preventDefault()
        let validationMsg = ''
        if (newP !== cPass) return toast.error('Passwords don\'t match')
        validationMsg = passwordValidator(newP) || ''
        if (validationMsg !== '') return toast.error(validationMsg)
        toast.dismiss()
        await changePassword('Changing Password. Please wait', { old, newP, cPass })
        navigate('/account')
    }
    return (
        <>
            <MetaData title={`CHANGE PASSWORD`} />
            <div className="changePassword">
                <div className="changePasswordbox">
                    <h2>
                        Change Password
                    </h2>
                    <form className='changePasswordform' onSubmit={formSubmit}>
                        <div className="changePasswordname">
                            <input type="password" placeholder='Current Password' required value={old} onChange={e => setOld(e.target.value)} />
                        </div>
                        <div className="changePasswordemail">
                            <input type="password" placeholder='New Password' required value={newP} onChange={e => setNewP(e.target.value)} />
                        </div>
                        <div className="changePasswordemail">
                            <input type="password" placeholder='Confirm New Password' required value={cPass} onChange={e => setCPass(e.target.value)} />
                        </div>
                        <Link to='/account'>
                            View Profile
                        </Link>
                        <input type="submit" value='Change Password' className='changePasswordbtn' disabled={pLoading} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword