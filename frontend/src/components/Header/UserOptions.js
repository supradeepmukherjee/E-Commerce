import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Dashboard from '@mui/icons-material/Dashboard'
import Person from '@mui/icons-material/Person'
import Exit from '@mui/icons-material/ExitToApp'
import List from '@mui/icons-material/ListAlt'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Actions/User';
import Alert from '../Alert';
import alert from '../../alert';
import { Backdrop } from '@mui/material';
import Cart from '@mui/icons-material/ShoppingCart';
import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import './Header.css'

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false)
    const [boxOpen, setBoxOpen] = useState(false)
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const { error } = useSelector(state => state.user)
    const itemsQty = useSelector(state => state.user.user.cartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dashboard = () => navigate('/dashboard')
    const orders = () => navigate('/myorders')
    const profile = () => navigate('/account')
    const cart = () => navigate('/cart')
    const boxToggle = () => boxOpen ? setBoxOpen(false) : setBoxOpen(true)
    const submitHandler = async () => {
        await dispatch(logout())
        navigate('/')
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
            icon: <Cart style={{ color: itemsQty.length ? '#ff6347' : 'unset' }} />,
            name: `Cart(${itemsQty.length})`,
            fn: cart
        },
        {
            icon: <Exit />,
            name: 'Logout',
            fn: boxToggle
        },
    ]
    if (user.role === 'Admin') {
        options.unshift({
            icon: <Dashboard />,
            name: 'Dashboard',
            fn: dashboard
        })
    }
    useEffect(() => {
        if (error === 500) alert('error', setAlertType, setAlertMsg, setAlertVisibility, dispatch, 500)
    }, [dispatch, error])
    return (
        <>
            <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                icon={
                    <img src={user.chavi.url ? user.chavi.url : '/profile.png'} alt='Options' className='icon' />
                }
                className='speedDial'>
                {options.map(option => <SpeedDialAction key={option.name} icon={option.icon} tooltipTitle={option.name} onClick={option.fn} tooltipOpen={window.innerWidth <= 600} />)}
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