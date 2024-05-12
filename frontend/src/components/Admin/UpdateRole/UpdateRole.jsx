import Role from '@mui/icons-material/VerifiedUser'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import useMutation from '../../../hooks/useMutation'
import { useGetUserProfileQuery, useUpdateRoleMutation } from '../../../redux/api/user'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import './UpdateRole.css'

const UpdateRole = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const navigate = useNavigate()
    const [role, setRole] = useState('')
    const [user, setUser] = useState({})
    const { id } = useParams()
    const [updateRole, loading] = useMutation(useUpdateRoleMutation)
    const submitHandler = async e => {
        e.preventDefault()
        await updateRole('Updating Role',{id, role})
        navigate('/adminusers')
    }
    const { isLoading, data, error, isError } = useGetUserProfileQuery(id)
    useErrors([{ error, isError }])
    useEffect(() => {
        if (data) setUser(data.user)
    }, [data])
    return (
        <>
            {isLoading ? <Loader /> : <>
                <MetaData title={"eCommerce"} />
                <div className="dashboard updateRole">
                    <SideBar />
                    <div className="profile profileAdmin">
                        <div className="">
                            <img src={user?.chavi.url} alt={user?.name} />
                        </div>
                        <div className="">
                            <div className="">
                                <h4>
                                    Full Name
                                </h4>
                                <p>
                                    {user?.name}
                                </p>
                            </div>
                            <div className="">
                                <h4>
                                    Email
                                </h4>
                                <p>
                                    {user?.email}
                                </p>
                            </div>
                            <div className="">
                                <h4>
                                    Joined on
                                </h4>
                                <p>
                                    {new Date(user?.createdAt).toString().split('G', 1)}
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