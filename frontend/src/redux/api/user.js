import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import server from '../../constant'

const api = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl: server }),
    tagTypes: ['user', 'admin-user'],
    endpoints: ({ mutation, query }) => ({
        register: mutation({
            query: ({ name, email, password, chavi }) => ({
                url: `/register`,
                method: `POST`,
                body: { name, email, password, chavi },//file
                credentials: 'include'
            }),
            invalidatesTags: ['user']
        }),
        login: mutation({
            query: ({ email, password }) => ({
                url: `/login`,
                method: `POST`,
                body: { email, password },
                credentials: 'include'
            }),
            invalidatesTags: ['user']
        }),
        getUser: query({
            query: () => ({
                url: '/me',
                credentials: 'include'
            }),
            providesTags: ['user']
        }),
        allUsers: query({
            query: () => ({
                url: '/admin/users',
                credentials: 'include'
            }),
            providesTags: ['admin-user']
        }),
        getUserProfile: query({
            query: id => ({
                url: `/admin/user/${id}`,
                credentials: 'include'
            }),
            providesTags: ['admin-user']
        }),
        updateProfile: mutation({
            query: ({ name, email, chavi }) => ({
                url: `/updateprofile`,
                method: `PUT`,
                body: { name, email, chavi },
                credentials: 'include'
            }),
            invalidatesTags: ['admin-user', 'user']
        }),
        updateRole: mutation({
            query: ({ id, role }) => ({
                url: `/admin/updaterole/${id}`,
                method: `PUT`,
                body: { role },
                credentials: 'include'
            }),
            invalidatesTags: ['admin-user', 'user']
        }),
        changePassword: mutation({
            query: ({ old, newP, cPass }) => ({
                url: `/updatepassword`,
                method: `PUT`,
                body: { old, newP, cPass },
                credentials: 'include'
            }),
            invalidatesTags: ['user']
        }),
        forgotPassword: mutation({
            query: email => ({
                url: `/forgotpassword`,
                method: `POST`,
                body: { email },
                credentials: 'include'
            }),
        }),
        resetPassword: mutation({
            query: ({ token, password }) => ({
                url: `/resetpassword/${token}`,
                method: `PUT`,
                body: { password },
                credentials: 'include'
            }),
        }),
        getShipInfo: query({
            query: () => ({
                url: `/getship`,
                credentials: 'include'
            }),
            providesTags: ['user']
        }),
    })
})

export default api
export const { useAllUsersQuery, useChangePasswordMutation, useForgotPasswordMutation, useGetShipInfoQuery, useGetUserProfileQuery, useGetUserQuery, useLoginMutation, useRegisterMutation, useResetPasswordMutation, useUpdateProfileMutation, useUpdateRoleMutation } = api