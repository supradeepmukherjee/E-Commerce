import { useEffect, useRef, useState } from 'react'
import Mail from '@mui/icons-material/MailOutline'
import Lock from '@mui/icons-material/LockOutlined'
import Face from '@mui/icons-material/Face'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../../../Actions/User'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import alert from '../../../alert'
import './RegisterLogin.css'
import MetaData from '../../MetaData'

const RegisterLogin = () => {
  const dispatch = useDispatch()
  const { error, loading, isAuthenticated } = useSelector(state => state.user)
  const loginTab = useRef(null)
  const registerTab = useRef(null)
  const switcherTab = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    chavi: 'https://res.cloudinary.com/dsjluiazl/image/upload/v1697892418/EcomChavi/profile_i8jybt.png'
  })
  const navigate = useNavigate()
  const redirect = window.location.search ? `/${window.location.search.split('=')[1]}` : '/account'
  const toggle = tab => {
    if (tab === 'login') {
      switcherTab.current.classList.add('shiftToNeutral')
      switcherTab.current.classList.remove('shiftToRight')
      registerTab.current.classList.remove('shiftToNeutralForm')
      loginTab.current.classList.remove('shiftToLeft')
    }
    if (tab === 'register') {
      switcherTab.current.classList.remove('shiftToNeutral')
      switcherTab.current.classList.add('shiftToRight')
      registerTab.current.classList.add('shiftToNeutralForm')
      loginTab.current.classList.add('shiftToLeft')
    }
  }
  const registerInputHandler = e => {
    if (e.target.name === 'chavi') {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        if (reader.readyState === 2) setUser({ ...user, [e.target.name]: reader.result })
      }
    }
    else setUser({ ...user, [e.target.name]: e.target.value })
  }
  const loginSubmit = e => {
    e.preventDefault()
    dispatch(loginUser(email, password))
    alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
  }
  const registerSubmit = e => {
    e.preventDefault()
    if (user.name.length < 5) {
      return alert('error', setAlertType, 'Name must be of mimimum 5 characters', setAlertMsg, setAlertVisibility, dispatch)
    }
    if (user.password.length < 8) {
      return alert('error', setAlertType, 'Password must be of mimimum 8 characters', setAlertMsg, setAlertVisibility, dispatch)
    }
    dispatch(registerUser(user.name, user.email, user.password, user.chavi))
    alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
  }
  useEffect(() => {
    if (error && error !== 'Please login first')
      alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    if (isAuthenticated) navigate(redirect)
  }, [dispatch, error, isAuthenticated, navigate, redirect])
  return (
    <>
      <MetaData title={'ECOMMERCE'} />
      {loading ? <Loader /> : <>
        <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
        <div className="registerlogin">
          <div className="registerloginBox">
            <div className="">
              <div className="registerloginToggle">
                <p onClick={() => toggle('login')}>
                  Log In
                </p>
                <p onClick={() => toggle('register')}>
                  Register
                </p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <Mail />
                <input type="email" placeholder='Email' required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="loginPassword">
                <Lock />
                <input type="password" placeholder='Password' required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <Link to='/forgotpassword'>
                Forgot Password?
              </Link>
              <input type="submit" value={'Login'} className='loginBtn' />
            </form>
            <form className='registerForm' ref={registerTab} onSubmit={registerSubmit}>
              <div className="registerName">
                <Face />
                <input type="text" placeholder='Name' required name='name' value={user.name} onChange={registerInputHandler} />
              </div>
              <div className="registerEmail">
                <Mail />
                <input type="email" placeholder='Email' required name='email' value={user.email} onChange={registerInputHandler} />
              </div>
              <div className="registerPassword">
                <Lock />
                <input type="password" placeholder='Password' name='password' required value={user.password} onChange={registerInputHandler} />
              </div>
              <div className='registerImg'>
                <img src={user.chavi} alt="Chavi Preview" />
                <input type="file" name='chavi' accept='image/*' onChange={registerInputHandler} />
              </div>
              <input type="submit" value='Register' className='registerBtn' disabled={loading ? true : false} />
            </form>
          </div>
        </div>
      </>}
    </>
  )
}

export default RegisterLogin