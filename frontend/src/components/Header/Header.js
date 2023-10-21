import { Link } from 'react-router-dom'
import { Home, HomeOutlined, List, ListOutlined, Search, SearchOutlined, AccountCircle, AccountCircleOutlined, InfoOutlined, Info, CallOutlined, Call } from '@mui/icons-material'
import { useState } from 'react'
import './Header.css'

const Header = ({ isAuthenticated, change, changeTab }) => {
    const [tab, setTab] = useState(window.location.pathname)
    return (
        <div className='header'>
            <Link
                to={'/'}
                onClick={() => {
                    setTab('/')
                    changeTab('/')
                }}>
                {change !== '/account' && tab === '/' ? <Home style={{ color: 'black' }} /> : <HomeOutlined />}
            </Link>
            <Link
                to={'/products'}
                onClick={() => {
                    setTab('/products')
                    changeTab('/')
                }}>
                {change !== '/account' && tab === '/products' ? <List style={{ color: 'black' }} /> : <ListOutlined />}
            </Link>
            <Link
                to={'/search'}
                onClick={() => {
                    setTab('/search')
                    changeTab('/')
                }}>
                {change !== '/account' && tab === '/search' ? <Search style={{ color: 'black' }} /> : <SearchOutlined />}
            </Link>
            <Link
                to={'/account'}
                onClick={() => {
                    isAuthenticated ?
                        setTab('/account')
                        :
                        setTab('/registerlogin')
                }}>
                {change === '/account' || tab === '/account' || tab === '/registerlogin' ? <AccountCircle style={{ color: 'black' }} /> : <AccountCircleOutlined />}
            </Link>
            <Link
                to={'/about'}
                onClick={() => {
                    setTab('/about')
                    changeTab('/')
                }}>
                {change !== '/account' && tab === '/about' ? <Info style={{ color: 'black' }} /> : <InfoOutlined />}
            </Link>
            <Link
                to={'/contact'}
                onClick={() => {
                    setTab('/contact')
                    changeTab('/')
                }}>
                {change !== '/account' && tab === '/contact' ? <Call style={{ color: 'black' }} /> : <CallOutlined />}
            </Link>
        </div>
    )
}

export default Header