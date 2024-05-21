import { lazy, Suspense, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webFont from 'webfontloader';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Loader from "./components/Loader/Loader";
import Payment from './components/Order/Payment/Payment';
import Protect from './components/Protect';
import { useLazyGetUserQuery } from "./redux/api/user";
import { userExists, userNotExists } from './redux/reducers/auth';
const RegisterLogin = lazy(() => import('./components/User/RegisterLogin/RegisterLogin'));
const Home = lazy(() => import('./components/Home/Home'));
const ProductDetails = lazy(() => import('./components/Product/ProductDetails/ProductDetails'));
const Products = lazy(() => import('./components/Product/Products/Products'));
const Search = lazy(() => import('./components/Search/Search'));
const UserOptions = lazy(() => import('./components/Header/UserOptions'));
const Profile = lazy(() => import('./components/User/Profile/Profile'));
const UpdateProfile = lazy(() => import('./components/User/UpdateProfile/UpdateProfile'));
const ChangePassword = lazy(() => import('./components/User/ChangePassword/ChangePassword'));
const ForgotPassword = lazy(() => import('./components/User/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/User/ResetPassword/ResetPassword'));
const Cart = lazy(() => import('./components/Product/Cart/Cart'));
const Shipping = lazy(() => import('./components/Order/Shipping/Shipping'));
const ConfirmOrder = lazy(() => import('./components/Order/ConfirmOrder/ConfirmOrder'));
const Success = lazy(() => import('./components/Order/Success/Success'));
const Orders = lazy(() => import('./components/Order/Orders/MyOrders'));
const OrderDetails = lazy(() => import('./components/Order/OrderDetails/OrderDetails'));
const Dashboard = lazy(() => import('./components/Admin/Dashboard/Dashboard'));
const ProductList = lazy(() => import('./components/Admin/ProductList/ProductList'));
const NewProduct = lazy(() => import('./components/Admin/NewProduct/NewProduct'));
const EditProduct = lazy(() => import('./components/Admin/EditProduct/EditProduct'));
const OrderList = lazy(() => import('./components/Admin/OrderList/OrderList'));
const ProcessOrder = lazy(() => import('./components/Admin/ProcessOrder/ProcessOrder'));
const UserList = lazy(() => import('./components/Admin/UserList/UserList'));
const UpdateRole = lazy(() => import('./components/Admin/UpdateRole/UpdateRole'));
const About = lazy(() => import('./components/About/About'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Error404 = lazy(() => import('./components/Error404/Error404'));

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector(({ auth }) => auth)
  const [tab, setTab] = useState('/')
  const [isAdmin, setIsAdmin] = useState(false)
  const [getUser] = useLazyGetUserQuery()
  useEffect(() => {
    webFont.load({ google: { families: ['Roboto', 'Droid Sans', 'Chilanka'] } })
    getUser()
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()))
  }, [dispatch, getUser])
  useEffect(() => {
    if (user && user.role === 'Admin') setIsAdmin(true)
  }, [user])
  return (
    <Router>
      <Header change={tab} changeTab={setTab} isAuthenticated={user} />
      {user &&
        <Suspense fallback={<Loader />}>
          <UserOptions changeTab={setTab} user={user} />
        </Suspense>}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/products/:keyword' element={<Products />} />
          <Route exact path='/registerlogin' element={<RegisterLogin />} />
          <Route exact path='/forgotpassword' element={<ForgotPassword />} />
          <Route exact path='/resetpassword/:token' element={<ResetPassword />} />
          <Route element={<Protect user={user} />}>
            <Route exact path='/account' element={<Profile />} />
            <Route exact path='/updateprofile' element={<UpdateProfile />} />
            <Route exact path='/updatepassword' element={<ChangePassword />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/shipping' element={<Shipping />} />
            <Route exact path='/confirmorder' element={<ConfirmOrder />} />
            <Route exact path='/pay' element={<Payment />} />
            <Route exact path='/success' element={<Success />} />
            <Route exact path='/myorders' element={<Orders />} />
            <Route exact path='/order/:id' element={<OrderDetails />} />
          </Route>
          <Route element={<Protect admin={true} isAdmin={isAdmin} />}>
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/adminproducts' element={<ProductList />} />
            <Route exact path='/adminorders' element={<OrderList />} />
            <Route exact path='/adminusers' element={<UserList />} />
            <Route exact path='/adminproduct' element={<NewProduct />} />
            <Route exact path='/adminproduct/:id' element={<EditProduct />} />
            <Route exact path='/adminorder/:id' element={<ProcessOrder />} />
            <Route exact path='/adminuser/:id' element={<UpdateRole />} />
          </Route>
          <Route path='*' element={window.location.pathname === '/pay' ? null : <Error404 />} />
        </Routes>
      </Suspense>
      <Footer />
      <Toaster position='top-center' />
    </Router >
  );
}

export default App;