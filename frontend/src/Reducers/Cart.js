import { createReducer, createAction } from "@reduxjs/toolkit";

const addCartRequest = createAction('addCartRequest')
const addCartSuccess = createAction('addCartSuccess')
const addCartFailure = createAction('addCartFailure')
const cartItemsRequest = createAction('cartItemsRequest')
const cartItemsSuccess = createAction('cartItemsSuccess')
const cartItemsFailure = createAction('cartItemsFailure')
const removeItemRequest = createAction('removeItemRequest')
const removeItemSuccess = createAction('removeItemSuccess')
const removeItemFailure = createAction('removeItemFailure')
const clearError = createAction('clearError')
const clearMsg = createAction('clearMsg')

const initialState = {}

export const cartReducer = createReducer(initialState, builder => {
    builder.addCase(addCartRequest, (state) => {
        state.loading = true
    })
    builder.addCase(addCartSuccess, (state, action) => {
        state.msg = action.payload
        state.loading = false
    })
    builder.addCase(addCartFailure, (state, action) => {
        state.error = action.payload
        state.loading = false
    })
    builder.addCase(removeItemRequest, (state) => {
        state.loading = true
    })
    builder.addCase(removeItemSuccess, (state, action) => {
        state.msg = action.payload
        state.loading = false
    })
    builder.addCase(removeItemFailure, (state, action) => {
        state.error = action.payload
        state.loading = false
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
})

export const cartItemsReducer = createReducer(initialState, builder => {
    builder.addCase(cartItemsRequest, (state) => {
        state.loading = true
    })
    builder.addCase(cartItemsSuccess, (state, action) => {
        state.cartItems = action.payload
        state.loading = false
    })
    builder.addCase(cartItemsFailure, (state, action) => {
        state.error = action.payload
        state.loading = false
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})