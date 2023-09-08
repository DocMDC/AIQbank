import { createSlice } from "@reduxjs/toolkit"

/*const authSlice = createSlice({
    name: 'auth',
    initialState: { email: null, roles: null, token: null },
    reducers: {
        setAuth: (state, action) => {
            const { email, roles, accessToken } = action.payload
            state.email = email
            state.roles = roles
            state.token = accessToken
        }
    }
}) */

const authSlice = createSlice({
    name: 'auth',
    initialState: { email: null, roles: null, token: null }, // Make sure 'token' is set to null
    reducers: {
        setAuth: (state, action) => {
            const { email, roles, accessToken } = action.payload;
            state.email = email;
            state.roles = roles;
            state.token = accessToken;
        },
    },
});


export const { setAuth } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.email
export const selectCurrentRoles = (state) => state.auth.roles
export const selectCurrentToken = (state) => state.auth.token