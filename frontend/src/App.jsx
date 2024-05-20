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
          <Route exact path='/account' element={user ? <Profile /> : <RegisterLogin />} />
          <Route exact path='/updateprofile' element={user ? <UpdateProfile /> : <RegisterLogin />} />
          <Route exact path='/updatepassword' element={user ? <ChangePassword /> : <RegisterLogin />} />
          <Route exact path='/forgotpassword' element={user ? <Profile /> : <ForgotPassword />} />
          <Route exact path='/resetpassword/:token' element={user ? <Profile /> : <ResetPassword />} />
          <Route exact path='/cart' element={user ? <Cart /> : <RegisterLogin />} />
          <Route exact path='/shipping' element={user ? <Shipping /> : <RegisterLogin />} />
          <Route exact path='/confirmorder' element={user ? <ConfirmOrder /> : <RegisterLogin />} />
          <Route exact path='/pay' element={user ? <Payment /> : <RegisterLogin />} />
          <Route exact path='/success' element={user ? <Success /> : <RegisterLogin />} />
          <Route exact path='/myorders' element={user ? <Orders /> : <RegisterLogin />} />
          <Route exact path='/order/:id' element={user ? <OrderDetails /> : <RegisterLogin />} />
          <Route exact path='/dashboard' element={isAdmin ? <Dashboard /> : <RegisterLogin />} />
          <Route exact path='/adminproducts' element={isAdmin ? <ProductList /> : <RegisterLogin />} />
          <Route exact path='/adminorders' element={isAdmin ? <OrderList /> : <RegisterLogin />} />
          <Route exact path='/adminusers' element={isAdmin ? <UserList /> : <RegisterLogin />} />
          <Route exact path='/adminproduct' element={isAdmin ? <NewProduct /> : <RegisterLogin />} />
          <Route exact path='/adminproduct/:id' element={isAdmin ? <EditProduct /> : <RegisterLogin />} />
          <Route exact path='/adminorder/:id' element={isAdmin ? <ProcessOrder /> : <RegisterLogin />} />
          <Route exact path='/adminuser/:id' element={isAdmin ? <UpdateRole /> : <RegisterLogin />} />
          <Route path='*' element={window.location.pathname === '/pay' ? null : <Error404 text='Page' />} />
        </Routes>
      </Suspense>
      <Footer />
      <Toaster position='top-center' />
    </Router >
  );
}

export default App;