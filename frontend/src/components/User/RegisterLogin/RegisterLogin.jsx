import Face from '@mui/icons-material/Face'
import Lock from '@mui/icons-material/LockOutlined'
import Mail from '@mui/icons-material/MailOutline'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, redirect as redirectRouter } from 'react-router-dom'
import server from '../../../constant'
import { userExists } from '../../../redux/reducers/auth'
import { nameValidator, passwordValidator } from '../../../utils/validators'
import MetaData from '../../MetaData'
import './RegisterLogin.css'

const RegisterLogin = () => {
  const { user: userRedux } = useSelector(({ auth }) => auth)
  const dispatch = useDispatch()
  const loginTab = useRef(null)
  const registerTab = useRef(null)
  const switcherTab = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    chavi: 'https://res.cloudinary.com/dsjluiazl/image/upload/v1697892418/EcomChavi/profile_i8jybt.png'
  })
  const [chaviFile, setChaviFile] = useState(null)
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
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setUser({ ...user, [e.target.name]: reader.result })
      }
      setChaviFile(file)
    }
    else setUser({ ...user, [e.target.name]: e.target.value })
  }
  const loginSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const id = toast.loading('Logging In...')
    try {
      const { data } = await axios.post(`${server}/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      )
      dispatch(userExists(data.user))
      toast.success(data.msg, { id })
      redirectRouter('/')
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.msg || 'Something went wrong', { id })
    } finally {
      setLoading(false)
    }
  }
  const registerSubmit = async e => {
    e.preventDefault()
    const id = toast.loading('Registering...')
    let validationMsg = ''
    validationMsg = nameValidator(user.name) || passwordValidator(user.password) || ''
    if (validationMsg !== '') return toast.error(validationMsg, { id })
    if (!chaviFile) return toast.error('Please upload Chavi', { id })
    setLoading(true)
    const formData = new FormData()
    formData.append('chavi', chaviFile)
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('password', user.password)
    try {
      const { data } = await axios.post(`${server}/user/register`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      dispatch(userExists(data.user))
      toast.success(data.msg, { id })
      redirectRouter('/')
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.msg || 'Something went wrong', { id })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (userRedux) navigate(redirect)
  }, [navigate, redirect, userRedux])
  return (
    <>
      <MetaData title={'ECOMMERCE'} />
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
            <input type="submit" value='Login' className='loginBtn' disabled={loading} />
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
            <input type="submit" value='Register' className='registerBtn' disabled={loading} />
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterLogin