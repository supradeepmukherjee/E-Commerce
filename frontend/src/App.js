import { useEffect, useState } from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import webFont from 'webfontloader'
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails/ProductDetails';
import Products from './components/Product/Products/Products';
import Search from './components/Search/Search';
import RegisterLogin from './components/User/RegisterLogin/RegisterLogin';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import UserOptions from './components/Header/UserOptions';
import Profile from './components/User/Profile/Profile';
import UpdateProfile from './components/User/UpdateProfile/UpdateProfile';
import ChangePassword from './components/User/ChangePassword/ChangePassword';
import ForgotPassword from './components/User/ForgotPassword/ForgotPassword';
import ResetPassword from './components/User/ResetPassword/ResetPassword';
import Cart from './components/Product/Cart/Cart';
import Shipping from './components/Order/Shipping/Shipping';
import ConfirmOrder from './components/Order/ConfirmOrder/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Order/Payment/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from './components/Order/Success/Success';
import Orders from './components/Order/Orders/MyOrders';
import OrderDetails from './components/Order/OrderDetails/OrderDetails';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import ProductList from './components/Admin/ProductList/ProductList';
import NewProduct from './components/Admin/NewProduct/NewProduct';
import EditProduct from './components/Admin/EditProduct/EditProduct';
import OrderList from './components/Admin/OrderList/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder/ProcessOrder';
import './App.css'
import UserList from './components/Admin/UserList/UserList';
import UpdateRole from './components/Admin/UpdateRole/UpdateRole';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Error404 from './components/Error404/Error404';

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.user)
  const [key, setKey] = useState('')
  const [tab, setTab] = useState('/')
  const [isAdmin, setIsAdmin] = useState(false)
  const getKey = async () => {
    const { data } = await axios.get('/api/v1/key')
    setKey(data.key)
  }
  useEffect(() => {
    dispatch(loadUser())
    getKey()
    webFont.load({ google: { families: ['Roboto', 'Droid Sans', 'Chilanka'] } })
  }, [dispatch])
  useEffect(() => {
    if (user && user.role === 'Admin') setIsAdmin(true)
  }, [user])
  return (
    <Router>
      <Header change={tab} changeTab={setTab} isAuthenticated={isAuthenticated} />
      {isAuthenticated && <UserOptions changeTab={setTab} user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/products/:keyword' element={<Products />} />
        <Route exact path='/registerlogin' element={<RegisterLogin />} />
        <Route exact path='/account' element={isAuthenticated ? <Profile /> : <RegisterLogin />} />
        <Route exact path='/updateprofile' element={isAuthenticated ? <UpdateProfile /> : <RegisterLogin />} />
        <Route exact path='/updatepassword' element={isAuthenticated ? <ChangePassword /> : <RegisterLogin />} />
        <Route exact path='/forgotpassword' element={isAuthenticated ? <Profile /> : <ForgotPassword />} />
        <Route exact path='/resetpassword/:token' element={isAuthenticated ? <Profile /> : <ResetPassword />} />
        <Route exact path='/cart' element={isAuthenticated ? <Cart /> : <RegisterLogin />} />
        <Route exact path='/shipping' element={isAuthenticated ? <Shipping /> : <RegisterLogin />} />
        <Route exact path='/confirmorder' element={isAuthenticated ? <ConfirmOrder /> : <RegisterLogin />} />
        <Route exact path='/success' element={isAuthenticated ? <Success /> : <RegisterLogin />} />
        <Route exact path='/myorders' element={isAuthenticated ? <Orders /> : <RegisterLogin />} />
        <Route exact path='/order/:id' element={isAuthenticated ? <OrderDetails /> : <RegisterLogin />} />
        <Route exact path='/dashboard' element={isAdmin ? <Dashboard /> : <RegisterLogin />} />
        <Route exact path='/adminproducts' element={isAdmin ? <ProductList /> : <RegisterLogin />} />
        <Route exact path='/adminorders' element={isAdmin ? <OrderList /> : <RegisterLogin />} />
        <Route exact path='/adminusers' element={isAdmin ? <UserList /> : <RegisterLogin />} />
        <Route exact path='/adminproduct' element={isAdmin ? <NewProduct /> : <RegisterLogin />} />
        <Route exact path='/adminproduct/:id' element={isAdmin ? <EditProduct /> : <RegisterLogin />} />
        <Route exact path='/adminorder/:id' element={isAdmin ? <ProcessOrder /> : <RegisterLogin />} />
        <Route exact path='/adminuser/:id' element={isAdmin ? <UpdateRole /> : <RegisterLogin />} />
        <Route path='*' element={window.location.pathname === '/pay' ? null : <Error404 text='Page' />} />
      </Routes >
      {key &&
        <Elements stripe={loadStripe(key)}>
          <Routes>
            <Route exact path='/pay' element={isAuthenticated ? <Payment /> : <RegisterLogin />} />
          </Routes>
        </Elements>
      }
      <Footer />
    </Router >
  );
}

export default App;
// ask others if they are facing font problem