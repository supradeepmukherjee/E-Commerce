import Edit from "@mui/icons-material/Edit"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useErrors from "../../../hooks/useErrors"
import { useAllUsersQuery } from '../../../redux/api/user'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import './UserList.css'

const UserList = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
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
  const [rows, setRows] = useState([])
  const { data, isLoading, error, isError } = useAllUsersQuery()
  useErrors([{ isError, error }])
  useEffect(() => {
    if (data) setRows(data.users.map(user => ({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    })))
  }, [data])
  return (
    <>
      {isLoading ? <Loader /> : <>
        <MetaData title={"eCommerce"} />
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