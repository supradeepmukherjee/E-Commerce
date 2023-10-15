import axios from 'axios'

export const registerUser = (name, email, password, chavi) => async dispatch => {
    try {
        dispatch({ type: 'registerRequest' })
        const { data } = await axios.post('/api/v1/register', { name, email, password, chavi }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'registerSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'registerFailure',
            payload: err.response.data.msg
        })
    }
}

export const loginUser = (email, password) => async dispatch => {
    try {
        dispatch({ type: 'loginRequest' })
        const { data } = await axios.post('/api/v1/login', { email, password }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'loginSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'loginFailure',
            payload: err.response.data.msg
        })
    }
}

export const loadUser = () => async dispatch => {
    try {
        dispatch({ type: 'loadUserRequest' })
        const { data } = await axios.get('/api/v1/me')
        dispatch({
            type: 'loadUserSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'loadUserFailure',
            payload: err.response.data.msg
        })
    }
}

export const allUsers = () => async dispatch => {
    try {
        dispatch({ type: 'allUsersRequest' })
        const { data } = await axios.get('/api/v1/admin/users')
        dispatch({
            type: 'allUsersSuccess',
            payload: data.users
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'allUsersFailure',
            payload: err.response.data.msg
        })
    }
}

export const getUserProfile = userID => async dispatch => {
    try {
        dispatch({ type: 'userProfileRequest' })
        const { data } = await axios.get(`/api/v1/admin/user/${userID}`)
        dispatch({
            type: 'userProfileSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'userProfileFailure',
            payload: err.response.data.msg
        })
    }
}

export const viewUser = id => async dispatch => {
    try {
        dispatch({ type: 'userProfileRequest' })
        const { data } = await axios.get(`/api/v1/admin/user/${id}`)
        dispatch({
            type: 'userProfileSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'userProfileFailure',
            payload: err.response.data.msg
        })
    }
}

export const updateProfile = (name, email, chavi) => async dispatch => {
    try {
        dispatch({ type: 'updateProfileRequest' })
        const { data } = await axios.put('/api/v1/updateprofile', { name, email, chavi }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'updateProfileSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'updateProfileFailure',
            payload: err.response.data.msg
        })
    }
}

export const updateRole = (id, role) => async dispatch => {
    try {
        dispatch({ type: 'updateRoleRequest' })
        const { data } = await axios.put(`/api/v1/admin/updaterole/${id}`, { role }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'updateRoleSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'updateRoleFailure',
            payload: err.response.data.msg
        })
    }
}

export const changePassword = (old, newP, cPass) => async dispatch => {
    try {
        dispatch({ type: 'changePasswordRequest' })
        const { data } = await axios.put('/api/v1/updatepassword', { old, newP, cPass }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'changePasswordSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'changePasswordFailure',
            payload: err.response.data.msg
        })
    }
}

export const forgotPassword = email => async dispatch => {
    try {
        dispatch({ type: 'forgotPasswordRequest' })
        const { data } = await axios.post('/api/v1/forgotpassword', { email }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'forgotPasswordSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'forgotPasswordFailure',
            payload: err.response.data.msg
        })
    }
}

export const resetPassword = (token, password) => async dispatch => {
    try {
        dispatch({ type: 'resetPasswordRequest' })
        const { data } = await axios.put(`/api/v1/resetpassword/${token}`, { password }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'resetPasswordSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'resetPasswordFailure',
            payload: err.response.data.msg
        })
    }
}

export const getShipInfo = () => async dispatch => {
    try {
        dispatch({ type: 'getShipInfoRequest' })
        const { data } = await axios.get('/api/v1/getship')
        dispatch({
            type: 'getShipInfoSuccess',
            payload: data.shipInfo
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'getShipInfoFailure',
            payload: err.response.data.msg
        })
    }
}

export const saveShipInfo = (address, city, state, country, pincode, phone) => async dispatch => {
    try {
        dispatch({ type: 'saveShipInfoRequest' })
        const { data } = await axios.put('/api/v1/shipnow', { address, city, state, country, pincode, phone }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'saveShipInfoSuccess',
            payload: data.shipInfo
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'saveShipInfoFailure',
            payload: err.response.data.msg
        })
    }
}

export const logout = () => async dispatch => {
    try {
        dispatch({ type: 'logoutUserRequest' })
        await axios.get('/api/v1/logout')
        dispatch({ type: 'logoutUserSuccess' })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'logoutUserFailure',
            payload: err.response.data.msg
        })
    }
}