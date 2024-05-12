import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import server from '../../constant'

const api = createApi({
    reducerPath: 'cart',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/user` }),
    tagTypes: ['cart'],
    endpoints: ({ mutation, query }) => ({
        addToCart: mutation({
            query: ({ id, qty }) => ({
                url: `/addtocart`,
                method: `PUT`,
                body: { id, qty },
                credentials: 'include'
            }),
            invalidatesTags: ['cart']
        }),
        removeItem: mutation({
            query: id => ({
                url: `/removeitem/${id}`,
                method: `PUT`,
                credentials: 'include'
            }),
            invalidatesTags: ['cart']
        }),
        getItems: query({
            query: () => ({
                url: `/cartitems`,
                credentials: 'include'
            }),
            providesTags: ['cart']
        }),

    })
})

export default api
export const { useAddToCartMutation, useGetItemsQuery, useRemoveItemMutation,useLazyGetItemsQuery } = api