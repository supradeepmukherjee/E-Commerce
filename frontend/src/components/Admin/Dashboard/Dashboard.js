import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from '../../Alert'
import SideBar from '../SideBar/SideBar'
import { Chart, registerables } from "chart.js"
import { Doughnut, Line } from "react-chartjs-2"
import MetaData from '../../MetaData'
import Loader from '../../Loader/Loader'
import './Dashboard.css'
import { getMyProducts } from '../../../Actions/Product'
import alert from '../../../alert'
import { getOrders } from '../../../Actions/Order'
import { allUsers } from '../../../Actions/User'
import { useGetMyProductsQuery } from '../../../redux/api/product'
import { useGetAdminOrdersQuery } from '../../../redux/api/order'
import { useAllUsersQuery } from '../../../redux/api/user'
import useErrors from '../../../hooks/useErrors'
Chart.register(...registerables);

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const dispatch = useDispatch()
  const { isError, error, data, isLoading } = useGetMyProductsQuery()
  const { isError: ordersIsError, error: ordersError, data: ordersData, isLoading: ordersLoading } = useGetAdminOrdersQuery()
  const { isError: usersIsError, isLoading: usersLoading, error: usersError, data: usersData } = useAllUsersQuery()
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  let outOfStock = 0
  products && products.forEach(product => {
    if (product.stock === 0) outOfStock += 1
  });
  let totalAmt = 0
  orders && orders.forEach(order => {
    totalAmt += order.amt
  });
  const lineData = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: '#ff6e6e',
        hoverBackgroundColor: 'rgb(198,72,50)',
        data: [0, totalAmt]
      },
    ]
  }
  const doughnutData = {
    labels: ['Out of Stock', 'In Stock'],
    datasets: [
      {
        backgroundColor: ['#00a684', '680084'],
        hoverBackgroundColor: ['#485000', '#35014f'],
        data: [outOfStock, products && (products.length - outOfStock)]
      }
    ]
  }
  useErrors([
    { isError, error },
    { isError: usersIsError, error: usersError },
    { isError: ordersIsError, error: ordersError },
  ])
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    if (ordersError) alert('error', setAlertType, ordersError, setAlertMsg, setAlertVisibility, dispatch)
    if (usersError) alert('error', setAlertType, usersError, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error, ordersError, usersError])
  return (
    <>
      {loading || ordersLoading || usersLoading ? <Loader /> : <>
        <MetaData title={"eCommerce"} />
        <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
        <div className="dashboard">
          <SideBar />
          <div className="dashboardContainer">
            <Typography component={'h1'}>
              Dashboard
            </Typography>
            <div className="dashboardSummary">
              <div className="">
                <p>
                  Total Amount: <br /> Rs. {totalAmt}
                </p>
              </div>
              <div className="dashboardSummary2">
                <Link to={'/adminproducts'}>
                  <p>
                    Products
                  </p>
                  <p>
                    {products && products.length}
                  </p>
                </Link>
                <Link to={'/adminorders'}>
                  <p>
                    Orders
                  </p>
                  <p>
                    {orders && orders.length}
                  </p>
                </Link>
                <Link to={'/adminusers'}>
                  <p>
                    Users
                  </p>
                  <p>
                    {users && users.length}
                  </p>
                </Link>
              </div>
            </div>
            <div className="lineChart">
              <Line
                data={lineData}
              />
            </div>
            <div className="doughnutChart">
              <Doughnut
                data={doughnutData}
              />
            </div>
          </div>
        </div>
      </>}
    </>
  )
}

export default Dashboard