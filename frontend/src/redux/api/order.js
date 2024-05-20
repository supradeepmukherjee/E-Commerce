import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import server from '../../constant'

const api = createApi({
    reducerPath: 'order',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/order` }),
    tagTypes: ['order', 'admin-order'],
    endpoints: ({ mutation, query }) => ({
        delOrder: mutation({
            query: id => ({
                url: `/admin/delorder/${id}`,
                method: `DELETE`,
                credentials: 'include'
            }),
            invalidatesTags: ['admin-order', 'order']
        }),
        getAdminOrders: query({
            query: () => ({
                url: `/admin/allorders`,
                credentials: 'include'
            }),
            providesTags: ['admin-order']
        }),
        editOrder: mutation({
            query: ({ id, status }) => ({
                url: `/admin/updateorderstatus/${id}`,
                method: `PUT`,
                body: { status },
                credentials: 'include'
            }),
            invalidatesTags: ['admin-order', 'order']
        }),
        getMyOrders: query({
            query: () => ({
                url: `/myorders`,
                credentials: 'include'
            }),
            providesTags: ['order']
        }),
        getOneOrder: query({
            query: id => ({
                url: `/order/${id}`,
                credentials: 'include'
            }),
            providesTags: ['order']
        }),
    })
})

export default api
export const { useDelOrderMutation, useEditOrderMutation, useGetAdminOrdersQuery, useGetMyOrdersQuery, useGetOneOrderQuery, useNewOrderMutation, useLazyGetAdminOrdersQuery } = api