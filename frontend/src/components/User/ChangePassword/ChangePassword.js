import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../../Actions/User'
import Alert from '../../Alert'
import alert from '../../../alert'
import MetaData from '../../MetaData'
import './ChangePassword.css'

const ChangePassword = () => {
    const dispatch = useDispatch()
    const { loading, error, msg } = useSelector(state => state.password)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [old, setOld] = useState('')
    const [newP, setNewP] = useState('')
    const [cPass, setCPass] = useState('')
    const formSubmit = e => {
        e.preventDefault()
        if (newP === cPass) {
            dispatch(changePassword(old, newP, cPass))
            alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
        }
        else alert('error', setAlertType, 'Passwords don\'t match', setAlertMsg, setAlertVisibility, dispatch)
    }
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
        if (msg) alert('success', setAlertType, msg, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error, msg])
    return (
        <>
            <MetaData title={`CHANGE PASSWORD`} />
            <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
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
                        <input type="submit" value='Change Password' className='changePasswordbtn' disabled={loading ? true : false} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword