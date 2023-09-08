import { configureStore } from "@reduxjs/toolkit";
import { qbankApi } from "./api/apiSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        [qbankApi.reducerPath]: qbankApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(qbankApi.middleware),
    devTools: true,
});
