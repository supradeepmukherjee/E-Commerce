import { Typography } from '@mui/material'
import { Chart, registerables } from "chart.js"
import { useEffect, useState } from 'react'
import { Doughnut, Line } from "react-chartjs-2"
import { Link } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import { useGetAdminOrdersQuery } from '../../../redux/api/order'
import { useGetMyProductsQuery } from '../../../redux/api/product'
import { useAllUsersQuery } from '../../../redux/api/user'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import SideBar from '../SideBar/SideBar'
import './Dashboard.css'
Chart.register(...registerables);

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const { isError, error, data, isLoading } = useGetMyProductsQuery()
  const { isError: ordersIsError, error: ordersError, data: ordersData, isLoading: ordersLoading } = useGetAdminOrdersQuery()
  const { isError: usersIsError, isLoading: usersLoading, error: usersError, data: usersData } = useAllUsersQuery()
  const [outOfStock, setOutOfStock] = useState(0)
  const [totalAmt, setTotalAmt] = useState(0)
  const [dData, setDdata] = useState([])
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
        data: dData
      }
    ]
  }
  useErrors([
    { isError, error },
    { isError: usersIsError, error: usersError },
    { isError: ordersIsError, error: ordersError },
  ])
  useEffect(() => {
    data?.products?.forEach(product => {
      if (product.stock === 0) setOutOfStock(s => s + 1)
    });
    setTotalAmt(ordersData?.totalAmt)
    setDdata([outOfStock, data?.products?.length - outOfStock])
  }, [data?.products, ordersData?.totalAmt, outOfStock])
  return (
    <>
      {isLoading || ordersLoading || usersLoading ? <Loader /> : <>
        <MetaData title={"eCommerce"} />
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
                    {data?.products?.length}
                  </p>
                </Link>
                <Link to={'/adminorders'}>
                  <p>
                    Orders
                  </p>
                  <p>
                    {ordersData?.orders?.length}
                  </p>
                </Link>
                <Link to={'/adminusers'}>
                  <p>
                    Users
                  </p>
                  <p>
                    {usersData?.users?.length}
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