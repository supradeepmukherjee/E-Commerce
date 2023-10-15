import { createReducer, createAction } from "@reduxjs/toolkit";

const allProductsRequest = createAction('allProductsRequest')
const allProductsSuccess = createAction('allProductsSuccess')
const allProductsFailure = createAction('allProductsFailure')
const productDetailsRequest = createAction('productDetailsRequest')
const productDetailsSuccess = createAction('productDetailsSuccess')
const productDetailsFailure = createAction('productDetailsFailure')
const newReviewRequest = createAction('newReviewRequest')
const newReviewSuccess = createAction('newReviewSuccess')
const newReviewFailure = createAction('newReviewFailure')
const delReviewRequest = createAction('delReviewRequest')
const delReviewSuccess = createAction('delReviewSuccess')
const delReviewFailure = createAction('delReviewFailure')
const adminProductsRequest = createAction('adminProductsRequest')
const adminProductsSuccess = createAction('adminProductsSuccess')
const adminProductsFailure = createAction('adminProductsFailure')
const newProductRequest = createAction('newProductRequest')
const newProductSuccess = createAction('newProductSuccess')
const newProductFailure = createAction('newProductFailure')
const delProductRequest = createAction('delProductRequest')
const delProductSuccess = createAction('delProductSuccess')
const delProductFailure = createAction('delProductFailure')
const editProductRequest = createAction('editProductRequest')
const editProductSuccess = createAction('editProductSuccess')
const editProductFailure = createAction('editProductFailure')
const clearMsg = createAction('clearMsg')
const clearError = createAction('clearError')

const initialState = {}

export const productReducer = createReducer(initialState, builder => {
    builder.addCase(allProductsRequest, state => {
        state.products = []
        state.loading = true
    })
    builder.addCase(allProductsSuccess, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.productsCount = action.payload.productCount
        state.resultPerPg = action.payload.resultPerPage
        state.filteredProductsCount = action.payload.filteredProductsCount
    })
    builder.addCase(allProductsFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(adminProductsRequest, state => {
        state.products = []
        state.loading = true
    })
    builder.addCase(adminProductsSuccess, (state, action) => {
        state.loading = false
        state.products = action.payload
    })
    builder.addCase(adminProductsFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(newProductRequest, state => {
        state.products = []
        state.loading = true
    })
    builder.addCase(newProductSuccess, (state, action) => {
        state.loading = false
        state.product = action.payload
    })
    builder.addCase(newProductFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(delProductRequest, state => {
        state.products = []
        state.loading = true
    })
    builder.addCase(delProductSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(delProductFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(editProductRequest, state => {
        state.products = []
        state.loading = true
    })
    builder.addCase(editProductSuccess, (state, action) => {
        state.loading = false
        state.product = action.payload
    })
    builder.addCase(editProductFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const productDetailsReducer = createReducer(initialState, builder => {
    builder.addCase(productDetailsRequest, state => {
        state.loading = true
    })
    builder.addCase(productDetailsSuccess, (state, action) => {
        state.loading = false
        state.productDetails = action.payload
    })
    builder.addCase(productDetailsFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const reviewReducer = createReducer(initialState, builder => {
    builder.addCase(newReviewRequest, state => {
        state.loading = true
    })
    builder.addCase(newReviewSuccess, (state, action) => {
        state.loading = false
        state.review = action.payload
    })
    builder.addCase(newReviewFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(delReviewRequest, state => {
        state.loading = true
    })
    builder.addCase(delReviewSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(delReviewFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})