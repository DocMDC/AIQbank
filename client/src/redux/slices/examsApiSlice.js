
import { apiSlice } from "../api/apiSlice";

export const examsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query({
      query: () => "/get-exams",
    }),
    getExam: builder.query({
      query: (id) => ({
        url: `/get-exam/${id}`,
        method: 'GET',
      }),
    }),
    updateSelection: builder.mutation({
      query: (questionInformation) => ({
        url: `/update-selection`,
        method: 'PATCH',
        body: { ...questionInformation },
      }),
      async onQueryStarted(questionInformation, { dispatch, queryFulfilled }) {
        // Optimistic update logic
        const { examId, questionIndex, selectionByNumber } = questionInformation;
        const patchResult = dispatch(
          examsApiSlice.util.updateQueryData('getExam', examId, (draft) => {
            const currentExam = draft.exam[0];
            if (currentExam && currentExam.listOfQuestions[questionIndex]) {
              currentExam.listOfQuestions[questionIndex].selection = selectionByNumber;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateFlaggedQuestions: builder.mutation({
        query: (questionInformation) => ({
          url: `/update-flags`,
          method: 'PATCH',
          body: { ...questionInformation },
        }),
    }),
  }),
});

export const {
  useGetExamsQuery,
  useGetExamQuery,
  useUpdateSelectionMutation,
} = examsApiSlice;



/*
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
        updateSelection: builder.mutation({
            query: (questionInformation) => ({
                url: `/update-selection`,
                method: 'PATCH',
                body: { ...questionInformation}
            })
        }),
    })
})

export const {
    useGetExamsQuery,
    useGetExamQuery,
    useUpdateSelectionMutation,
} = examsApiSlice

*/

