import Dashboard from '@mui/icons-material/Dashboard';
import Exit from '@mui/icons-material/ExitToApp';
import List from '@mui/icons-material/ListAlt';
import Person from '@mui/icons-material/Person';
import Cart from '@mui/icons-material/ShoppingCart';
import { Backdrop, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import server from '../../constant';
import { userNotExists } from '../../redux/reducers/auth';
import './Header.css';

const UserOptions = ({ user, changeTab }) => {
    const [open, setOpen] = useState(false)
    const [boxOpen, setBoxOpen] = useState(false)
    const itemsQty = useSelector(({ auth }) => auth.user.cartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dashboard = () => {
        navigate('/dashboard')
        changeTab('/account')
    }
    const orders = () => {
        navigate('/myorders')
        changeTab('/account')
    }
    const profile = () => {
        navigate('/account')
        changeTab('/account')
    }
    const cart = () => {
        navigate('/cart')
        changeTab('/account')
    }
    const boxToggle = () => boxOpen ? setBoxOpen(false) : setBoxOpen(true)
    const submitHandler = async () => {
        try {
            const { data } = await axios.get(`${server}/user/logout`, { withCredentials: true })
            dispatch(userNotExists())
            toast.success(data.msg)
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.msg || 'Something went wrong')
        } finally {
            navigate('/account')
        }
    }
    const options = [
        {
            icon: <List />,
            name: 'Orders',
            fn: orders
        },
        {
            icon: <Person />,
            name: 'Profile',
            fn: profile
        },
        {
            icon: <Cart style={{ color: itemsQty?.length ? '#ff6347' : 'unset' }} />,
            name: `Cart(${itemsQty?.length})`,
            fn: cart
        },
        {
            icon: <Exit />,
            name: 'Logout',
            fn: boxToggle
        },
    ]
    if (user?.role === 'Admin') {
        options.unshift({
            icon: <Dashboard />,
            name: 'Dashboard',
            fn: dashboard
        })
    }
    return (
        <>
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                icon={
                    <img src={user?.chavi?.url ? user?.chavi?.url : '/profile.png'} alt='Options' className='icon' />
                }
                className='speedDial'>
                {options.map(({ name, icon, fn }) => <SpeedDialAction key={name} icon={icon} tooltipTitle={name} onClick={fn} tooltipOpen={window.innerWidth <= 600} />)}
            </SpeedDial>
            <Dialog aria-labelledby='simple-dialog-title' open={boxOpen} onClose={boxToggle}>
                <DialogTitle>
                    Are you sure you want to Logout?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={boxToggle} color='secondary'>
                        Close
                    </Button>
                    <Button color='primary' onClick={submitHandler}>
                        Log Out
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserOptions