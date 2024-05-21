import { Navigate, Outlet } from "react-router-dom";

const Protect = ({ admin = false, isAdmin, user, redirect = '/registerlogin' }) => {
    if (admin) {
        if (!isAdmin) return <Navigate to={redirect} />
    }
    else {
        if (!user) return <Navigate to={redirect} />
    }
    return <Outlet />
}

export default Protect