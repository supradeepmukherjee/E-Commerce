import Role from '@mui/icons-material/VerifiedUser'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateRole, viewUser } from '../../../Actions/User'
import alert from '../../../alert'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import './UpdateRole.css'

const UpdateRole = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const { error, loading, user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [role, setRole] = useState('')
    const { id } = useParams()
    const submitHandler = async e => {
        e.preventDefault()
        alert('info', setAlertType, 'Updating User Role. Please wait', setAlertMsg, setAlertVisibility, dispatch)
        await dispatch(updateRole(id, role))
        navigate('/adminusers')
    }
    useEffect(() => {
        dispatch(viewUser(id))
    }, [dispatch, id])
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error])
    return (
        <>
            {loading ? <Loader /> : <>
                <MetaData title={"eCommerce"} />
                <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
                <div className="dashboard updateRole">
                    <SideBar />
                    <div className="profile profileAdmin">
                        <div className="">
                            <img src={user.chavi.url} alt={user.name} />
                        </div>
                        <div className="">
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
                            <form onSubmit={submitHandler} className="newProductForm updateRoleForm">
                                <h1 className='processOrderH1'>
                                    Update Role
                                </h1>
                                <div className="">
                                    <Role />
                                    <select value={role} name="status" onChange={e => setRole(e.target.value)}>
                                        <option value="User">
                                            User
                                        </option>
                                        <option value="Admin">
                                            Admin
                                        </option>
                                    </select>
                                </div>
                                <Button type='submit' disabled={loading} className='updateStatusBtn'>
                                    Update User Role
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default UpdateRole