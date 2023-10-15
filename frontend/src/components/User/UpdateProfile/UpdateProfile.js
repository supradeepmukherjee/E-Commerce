import { useEffect, useState } from 'react'
import Mail from '@mui/icons-material/MailOutline'
import Face from '@mui/icons-material/Face'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser } from '../../../Actions/User'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import alert from '../../../alert'
import './UpdateProfile.css'
import MetaData from '../../MetaData'

const UpdateProfile = () => {
  const dispatch = useDispatch()
  const { user: sUser, loading: uLoading, error: loadError } = useSelector(state => state.user)
  const { loading, msg, error } = useSelector(state => state.updateMyProfile)
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    chavi: '',
  })
  const formInputHandler = e => {
    if (e.target.name === 'chavi') {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        if (reader.readyState === 2) setUser({ ...user, [e.target.name]: reader.result })
      }
    }
    else setUser({ ...user, [e.target.name]: e.target.value })
  }
  const formSubmit = e => {
    e.preventDefault()
    dispatch(updateProfile(user.name, user.email, user.chavi))
    alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
  }
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  useEffect(() => {
    if (sUser) {
      setUser({
        name: sUser.name,
        email: sUser.email,
        chavi: sUser.chavi.url,
      })
    }
  }, [sUser])
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    if (msg) navigate('/account')
  }, [dispatch, error, loadError, msg, navigate, user])
  return (
    <>
      {uLoading ? <Loader /> : <>
        <MetaData title={`Update Profile`} />
        <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
        <div className="updateProfile">
          <div className="updateProfilebox">
            <h2>
              Update Profile
            </h2>
            <form className='updateProfileform' onSubmit={formSubmit}>
              <div className="updateProfilename">
                <Face />
                <input type="text" placeholder='Name' required name='name' value={user.name} onChange={formInputHandler} />
              </div>
              <div className="updateProfileemail">
                <Mail />
                <input type="email" placeholder='Email' required name='email' value={user.email} onChange={formInputHandler} />
              </div>
              <div className='updateProfileimg'>
                <img src={user.chavi} alt="Chavi Preview" />
                <input type="file" name='chavi' accept='image/*' onChange={formInputHandler} />
              </div>
              <Link to='/account'>
                View Profile
              </Link>
              <input type="submit" value='Update Profile' className='updateProfilebtn' disabled={loading} />
            </form>
          </div>
        </div>
      </>}
    </>
  )
}

export default UpdateProfile