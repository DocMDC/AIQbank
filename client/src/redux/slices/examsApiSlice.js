import { apiSlice } from "../api/apiSlice";

export const examsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getExams: builder.query({
            query: () => "/get-exams", 
        }),
        getExam: builder.query({
            query: (id) => ({
                url: `/get-exam/${id}`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useGetExamsQuery,
    useGetExamQuery
} = examsApiSlice