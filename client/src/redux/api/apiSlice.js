import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const qbankApi = createApi({
    reducerPath: "qbankApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api/v1"}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: 'POST',
                body: data
            })
        }),
    }),
})

export const { useRegisterMutation, useLoginMutation } = qbankApi

