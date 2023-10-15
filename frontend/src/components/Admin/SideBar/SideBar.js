import logo from '../../../images/logo.png'
import { TreeView } from '@mui/x-tree-view/TreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import Collapse from '@mui/icons-material/ExpandLess'
import Expand from '@mui/icons-material/ExpandMore'
import List from '@mui/icons-material/List'
import Add from '@mui/icons-material/Add'
import ListAlt from '@mui/icons-material/ListAlt'
import DashBoard from '@mui/icons-material/Dashboard'
import People from '@mui/icons-material/People'
import { Link } from 'react-router-dom'
import './SideBar.css'

const SideBar = () => {
    return (
        <div className="sidebar">
            <Link to={'/'}>
                <img src={logo} alt="homepage" />
            </Link>
            <Link to={'/dashboard'}>
                <p>
                    <DashBoard /> Dashboard
                </p>
            </Link>
            <Link>
                <TreeView
                    defaultExpandIcon={<Collapse />}
                    defaultCollapseIcon={<Expand />}
                >
                    <TreeItem nodeId='1' label='Products'>
                        <Link to={'/adminproducts'}>
                            <TreeItem nodeId='2' label='All' icon={<List />} />
                        </Link>
                        <Link to={'/adminproduct'}>
                            <TreeItem nodeId='3' label='Create' icon={<Add />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to={'/adminorders'}>
                <p>
                    <ListAlt /> Orders
                </p>
            </Link>
            <Link to={'/adminusers'}>
                <p>
                    <People /> Users
                </p>
            </Link>
        </div>
    )
}

export default SideBar