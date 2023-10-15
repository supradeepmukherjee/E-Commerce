import axios from 'axios'

export const getProducts = (keyword = '', currentPg = 1, price = [0, 100000], category, rating = 0) => async dispatch => {
    try {
        dispatch({ type: 'allProductsRequest' })
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPg}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating=${rating}`
        if (category)
            link = `/api/v1/products?keyword=${keyword}&page=${currentPg}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating=${rating}`
        const { data } = await axios.get(link)
        dispatch({
            type: 'allProductsSuccess',
            payload: data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'allProductsFailure',
            payload: err.response.data.msg
        })
    }
}

export const productDetails = id => async dispatch => {
    try {
        dispatch({ type: 'productDetailsRequest' })
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type: 'productDetailsSuccess',
            payload: data.product
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'productDetailsFailure',
            payload: err.response.data.msg
        })
    }
}

export const newProduct = product => async dispatch => {
    try {
        dispatch({ type: 'newProductRequest' })
        const { data } = await axios.post(`/api/v1/admin/newproduct`, product, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'newProductSuccess',
            payload: data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'newProductFailure',
            payload: err.response.data.msg
        })
    }
}

export const getMyProducts = () => async dispatch => {
    try {
        dispatch({ type: 'adminProductsRequest' })
        const { data } = await axios.get(`/api/v1/admin/products`)
        dispatch({
            type: 'adminProductsSuccess',
            payload: data.products
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'adminProductsFailure',
            payload: err.response.data.msg
        })
    }
}

export const editProduct = (id, details) => async dispatch => {
    try {
        dispatch({ type: 'editProductRequest' })
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, details, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'editProductSuccess',
            payload: data.product
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'editProductFailure',
            payload: err.response.data.msg
        })
    }
}

export const delProduct = id => async dispatch => {
    try {
        dispatch({ type: 'delProductRequest' })
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
        dispatch({
            type: 'delProductSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'delProductFailure',
            payload: err.response.data.msg
        })
    }
}

export const delReview = (productID, id) => async dispatch => {
    try {
        dispatch({ type: 'delReviewRequest' })
        const { data } = await axios.delete(`/api/v1/review/${id}?productID=${productID}`)
        dispatch({
            type: 'delReviewSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'delReviewFailure',
            payload: err.response.data.msg
        })
    }
}

export const submitReview = (productID, rating, comment) => async dispatch => {
    try {
        dispatch({ type: 'newReviewRequest' })
        const { data } = await axios.put(`/api/v1/review`, { productID, rating, comment }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'newReviewSuccess',
            payload: data.product
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'newReviewFailure',
            payload: err.response.data.msg
        })
    }
}