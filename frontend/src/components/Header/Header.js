import { Link } from 'react-router-dom'
import { Home, HomeOutlined, List, ListOutlined, Search, SearchOutlined, AccountCircle, AccountCircleOutlined, InfoOutlined, Info, CallOutlined, Call } from '@mui/icons-material'
import { useState } from 'react'
import './Header.css'

const Header = ({ isAuthenticated }) => {
    const [tab, setTab] = useState(window.location.pathname)
    return (
        <div className='header'>
            <Link
                to={'/'}
                onClick={() => setTab('/')}>
                {tab === '/' ? <Home style={{ color: 'black' }} /> : <HomeOutlined />}
            </Link>
            <Link
                to={'/products'}
                onClick={() => setTab('/products')}>
                {tab === '/products' ? <List style={{ color: 'black' }} /> : <ListOutlined />}
            </Link>
            <Link
                to={'/search'}
                onClick={() => setTab('/search')}>
                {tab === '/search' ? <Search style={{ color: 'black' }} /> : <SearchOutlined />}
            </Link>
            <Link
                to={'/account'}
                onClick={() => {
                    isAuthenticated ?
                        setTab('/account')
                        :
                        setTab('/registerlogin')
                }}>
                {tab === '/account' || tab === '/registerlogin' ? <AccountCircle style={{ color: 'black' }} /> : <AccountCircleOutlined />}
            </Link>
            <Link
                to={'/about'}
                onClick={() => setTab('/about')}>
                {tab === '/about' ? <Info style={{ color: 'black' }} /> : <InfoOutlined />}
            </Link>
            <Link
                to={'/contact'}
                onClick={() => setTab('/contact')}>
                {tab === '/contact' ? <Call style={{ color: 'black' }} /> : <CallOutlined />}
            </Link>
        </div>
    )
}

export default Header