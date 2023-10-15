import { createAction, createReducer } from "@reduxjs/toolkit"

const newOrderRequest = createAction('newOrderRequest')
const newOrderSuccess = createAction('newOrderSuccess')
const newOrderFailure = createAction('newOrderFailure')
const myOrdersRequest = createAction('myOrdersRequest')
const myOrdersSuccess = createAction('myOrdersSuccess')
const myOrdersFailure = createAction('myOrdersFailure')
const myOrderRequest = createAction('myOrderRequest')
const myOrderSuccess = createAction('myOrderSuccess')
const myOrderFailure = createAction('myOrderFailure')
const ordersRequest = createAction('ordersRequest')
const ordersSuccess = createAction('ordersSuccess')
const ordersFailure = createAction('ordersFailure')
const delOrderRequest = createAction('delOrderRequest')
const delOrderSuccess = createAction('delOrderSuccess')
const delOrderFailure = createAction('delOrderFailure')
const editOrderRequest = createAction('editOrderRequest')
const editOrderSuccess = createAction('editOrderSuccess')
const editOrderFailure = createAction('editOrderFailure')
const clearError = createAction('clearError')
const clearMsg = createAction('clearMsg')

const initialState = {}

export const orderReducer = createReducer(initialState, builder => {
    builder.addCase(newOrderRequest, state => {
        state.loading = true
    })
    builder.addCase(newOrderSuccess, (state, action) => {
        state.loading = false
        state.order = action.payload
    })
    builder.addCase(newOrderFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(myOrdersRequest, state => {
        state.loading = true
    })
    builder.addCase(myOrdersSuccess, (state, action) => {
        state.loading = false
        state.orders = action.payload
    })
    builder.addCase(myOrdersFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(ordersRequest, state => {
        state.loading = true
    })
    builder.addCase(ordersSuccess, (state, action) => {
        state.loading = false
        state.orders = action.payload
    })
    builder.addCase(ordersFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(myOrderRequest, state => {
        state.loading = true
    })
    builder.addCase(myOrderSuccess, (state, action) => {
        state.loading = false
        state.order = action.payload
    })
    builder.addCase(myOrderFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(delOrderRequest, state => {
        state.products = []
        state.loading = true
    })
    builder.addCase(delOrderSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(delOrderFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(editOrderRequest, state => {
        state.products = []
        state.loading = true
    })
    builder.addCase(editOrderSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(editOrderFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
})