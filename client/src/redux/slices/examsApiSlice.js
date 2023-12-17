import { apiSlice } from "../api/apiSlice";

export const examsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getExams: builder.query({
            query: () => "/get-exams", 
        }),
    })
})

export const {
    useGetExamsQuery
} = examsApiSlice