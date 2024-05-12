import Face from '@mui/icons-material/Face'
import Mail from '@mui/icons-material/MailOutline'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useMutation from '../../../hooks/useMutation'
import { useUpdateProfileMutation } from '../../../redux/api/user'
import { nameValidator } from '../../../utils/validators'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import './UpdateProfile.css'

const UpdateProfile = () => {
  const { user: sUser, loading } = useSelector(({ auth }) => auth)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    chavi: '',
  })
  const [chaviFile, setChaviFile] = useState(null)
  const [updateProfile, updateLoading] = useMutation(useUpdateProfileMutation)
  const formInputHandler = e => {
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
  const formSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    if (user.name !== sUser.name) {
      let validationMsg = ''
      validationMsg = nameValidator(user.name) || ''
      if (validationMsg !== '') return toast.error(validationMsg)
      formData.append('name', user.name)
    }
    if (user.email !== sUser.email) formData.append('email', user.email)
    if (user.chavi !== sUser.chavi.url) formData.append('chavi', chaviFile)
    toast.dismiss()
    await updateProfile('Updating Profile Details', formData)
    navigate('/account')
  }
  useEffect(() => {
    if (sUser) {
      setUser({
        name: sUser.name,
        email: sUser.email,
        chavi: sUser.chavi.url,
      })
    }
  }, [sUser])
  return (
    <>
      {loading ? <Loader /> : <>
        <MetaData title={`Update Profile`} />
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
              <input type="submit" value='Update Profile' className='updateProfilebtn' disabled={updateLoading} />
            </form>
          </div>
        </div>
      </>}
    </>
  )
}

export default UpdateProfile