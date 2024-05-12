import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import server from '../../constant'

const api = createApi({
    reducerPath: 'product',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/product` }),
    tagTypes: ['product', 'admin-product', 'review'],
    endpoints: ({ mutation, query }) => ({
        newProduct: mutation({
            query: product => ({
                url: `/admin/newproduct`,
                method: `POST`,
                body: product, //file
                credentials: 'include'
            }),
            invalidatesTags: ['order', 'admin-order']
        }),
        delProduct: mutation({
            query: id => ({
                url: `/admin/product/${id}`,
                method: `DELETE`,
                credentials: 'include'
            }),
            invalidatesTags: ['admin-product', 'product']
        }),
        delReview: mutation({
            query: ({ id, productID }) => ({
                url: `/review/${id}?productID=${productID}`,
                method: `DELETE`,
                credentials: 'include'
            }),
            invalidatesTags: ['product']
        }),
        getProducts: query({
            query: ({ keyword = '', currentPg = 1, price = [0, 100000], category, rating = 0 }) => {
                let url = `/products?keyword=${keyword}&page=${currentPg}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating=${rating}`
                if (category) url += `&category=${category}`
                return {
                    url,
                    credentials: 'include'
                }
            },
            providesTags: ['product']
        }),
        editProduct: mutation({
            query: ({ id, data }) => ({
                url: `/admin/product/${id}`,
                method: `PUT`,
                body: data,//file
                credentials: 'include'
            }),
            invalidatesTags: ['admin-product', 'product']
        }),
        productDetails: query({
            query: id => ({
                url: `/product/${id}`,
                credentials: 'include'
            }),
            providesTags: ['product']
        }),
        getMyProducts: query({
            query: () => ({
                url: `/admin/products`,
                credentials: 'include'
            }),
            providesTags: ['admin-product']
        }),
        submitReview: mutation({
            query: ({ productID, rating, comment }) => ({
                url: `/review`,
                method: `PUT`,
                body: { productID, rating, comment },
                credentials: 'include'
            }),
            invalidatesTags: ['product']
        }),
    })
})

export default api
export const { useDelProductMutation, useDelReviewMutation, useEditProductMutation, useGetMyProductsQuery, useGetProductsQuery, useNewProductMutation, useProductDetailsQuery, useSubmitReviewMutation, useLazyGetProductsQuery, useLazyGetMyProductsQuery, useLazyProductDetailsQuery } = api