import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import server from '../../constant'

const api = createApi({
    reducerPath: 'stripe',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/payment` }),
    endpoints: ({ query }) => ({
        key: query({
            query: () => ({
                url: `/key`,
                credentials: 'include'
            })
        }),
        secretKey: query({
            query: () => ({
                url: `/secret-key`,
                credentials: 'include'
            })
        }),
    })
})

export default api
export const { useKeyQuery, useSecretKeyQuery } = api