import axios from 'axios'

export const addToCart = (id, qty) => async dispatch => {
    try {
        dispatch({ type: 'addCartRequest' })
        const { data } = await axios.put(`/api/v1/addtocart`, { id, qty }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'addCartSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'addCartFailure',
            payload: err.response.data.msg
        })
    }
}

export const removeItem = id => async dispatch => {
    try {
        dispatch({ type: 'removeItemRequest' })
        const { data } = await axios.put(`/api/v1/removeitem/${id}`)
        dispatch({
            type: 'removeItemSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'removeItemFailure',
            payload: err.response.data.msg
        })
    }
}

export const getItems = () => async dispatch => {
    try {
        dispatch({ type: 'cartItemsRequest' })
        const { data } = await axios.get(`/api/v1/cartitems`)
        dispatch({
            type: 'cartItemsSuccess',
            payload: data.items
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'cartItemsFailure',
            payload: err.response.data.msg
        })
    }
}