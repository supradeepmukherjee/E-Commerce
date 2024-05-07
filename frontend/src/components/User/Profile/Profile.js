import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadUser } from '../../../Actions/User'
import alert from '../../../alert'
import useErrors from '../../../hooks/useErrors'
import { useGetUserQuery } from '../../../redux/api/user'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import './Profile.css'

const Profile = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const dispatch = useDispatch()
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const { data, isError, isLoading, error } = useGetUserQuery()
  useErrors([{ error, isError }])
  useEffect(() => {
    if (error && error !== 'Please login first') alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error])
  return (
    <>
      {isLoading ? <Loader /> : <>
        <MetaData title={`${user.name}'s Profile`} />
        <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
        <div className="profile">
          <div className="">
            <h1>
              My Profile
            </h1>
            <img src={user.chavi.url} alt={user.name} />
            <Link to='/updateprofile'>
              Edit Profile
            </Link>
          </div>
          <div className="profileDetails">
            <div className="">
              <h4>
                Full Name
              </h4>
              <p>
                {user.name}
              </p>
            </div>
            <div className="">
              <h4>
                Email
              </h4>
              <p>
                {user.email}
              </p>
            </div>
            <div className="">
              <h4>
                Joined on
              </h4>
              <p>
                {new Date(user.createdAt).toString().split('G', 1)}
              </p>
            </div>
            <div className="">
              <Link to='/myorders'>
                My Orders
              </Link>
              <Link to='/updatepassword'>
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </>}
    </>
  )
}

export default Profile