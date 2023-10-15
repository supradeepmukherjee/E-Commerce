import axios from 'axios'

export const newOrder = order => async dispatch => {
    try {
        dispatch({ type: 'newOrderRequest' })
        const { data } = await axios.post('/api/v1/neworder', order, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'newOrderSuccess',
            payload: data.order
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'newOrderFailure',
            payload: err.response.data.msg
        })
    }
}

export const getOrders = () => async dispatch => {
    try {
        dispatch({ type: 'ordersRequest' })
        const { data } = await axios.get(`/api/v1/admin/allorders`)
        dispatch({
            type: 'ordersSuccess',
            payload: data.orders
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'ordersFailure',
            payload: err.response.data.msg
        })
    }
}

export const delOrder = id => async dispatch => {
    try {
        dispatch({ type: 'delOrderRequest' })
        const { data } = await axios.delete(`/api/v1/admin/delorder/${id}`)
        dispatch({
            type: 'delOrderSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'delOrderFailure',
            payload: err.response.data.msg
        })
    }
}

export const editOrder = (id, status) => async dispatch => {
    try {
        dispatch({ type: 'editOrderRequest' })
        const { data } = await axios.put(`/api/v1/admin/updateorderstatus/${id}`, { status }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'editOrderSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'editOrderFailure',
            payload: err.response.data.msg
        })
    }
}

export const getMyOrders = () => async dispatch => {
    try {
        dispatch({ type: 'myOrdersRequest' })
        const { data } = await axios.get('/api/v1/myorders')
        dispatch({
            type: 'myOrdersSuccess',
            payload: data.orders
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'myOrdersFailure',
            payload: err.response.data.msg
        })
    }
}

export const getOneOrder = id => async dispatch => {
    try {
        dispatch({ type: 'myOrderRequest' })
        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch({
            type: 'myOrderSuccess',
            payload: data.order
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'myOrderFailure',
            payload: err.response.data.msg
        })
    }
}