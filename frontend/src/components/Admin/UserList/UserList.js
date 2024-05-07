import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../Alert'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import { DataGrid } from "@mui/x-data-grid";
import Edit from "@mui/icons-material/Edit";
import { Link } from 'react-router-dom'
import alert from '../../../alert'
import SideBar from '../SideBar/SideBar'
import './UserList.css'
import { allUsers } from '../../../Actions/User'
import { useAllUsersQuery } from '../../../redux/api/user'
import useErrors from '../../../hooks/useErrors'

const UserList = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const dispatch = useDispatch()
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const columns = [
    {
      field: 'id',
      headerName: 'User ID',
      minWidth: 270,
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 150,
      flex: .5,
    },
    {
      field: 'name',
      headerName: 'Name',
      type: 'number',
      minWidth: 150,
      flex: .3
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      minWidth: 270,
      flex: .5
    },
    {
      field: 'actions',
      headerName: 'Action',
      type: 'number',
      minWidth: 150,
      flex: .5,
      sortable: false,
      renderCell: params => {
        return (
          <>
            <Link to={`/adminuser/${params.row.id}`}>
              <Edit />
            </Link>
          </>
        )
      }
    },
  ]
  const rows = []
  users && users.forEach(user => {
    rows.push({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    })
  });
  const { data, isLoading, error, isError } = useAllUsersQuery()
  useErrors([{ isError, error }])
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error])
  return (
    <>
      {isLoading ? <Loader /> : <>
        <MetaData title={"eCommerce"} />
        <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 className="productListHeading">
              List of Users
            </h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              className='productListTable'
              autoHeight
            />
          </div>
        </div>
      </>}
    </>
  )
}

export default UserList