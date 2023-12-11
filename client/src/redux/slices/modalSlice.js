import { createSlice } from "@reduxjs/toolkit"

const modalSlice = createSlice({
    name: 'modal',
    initialState: { 
        examName: false, 
    },
    reducers: {
        setExamNameModal: (state, action) => {
            state.examName = action.payload;
        },
    },
});

export const { setExamNameModal } = modalSlice.actions
export default modalSlice.reducer
export const selectExamNameModal = (state) => state.modal.examName
