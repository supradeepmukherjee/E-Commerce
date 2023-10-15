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

const UserList = () => {
  const dispatch = useDispatch()
  const { loading, users, error } = useSelector(state => state.user)
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
  useEffect(() => {
    dispatch(allUsers())
  }, [dispatch])
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error])
  return (
    <>
      {loading ? <Loader /> : <>
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