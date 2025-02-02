import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "./api";
import { message } from "antd";
import axios from "axios";
import { Expand, getUser, userLogin } from "./authFunctions/userLogin";


const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken', 'role')
    : null;



const initialState = {
    loading: true,
    user: JSON.parse(localStorage.getItem("user")),
    userToken: localStorage.getItem("userToken"),
    isAuthenticated: false,

};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
            return {
                ...state,
                userToken: null,
                user: null,
                loading: false,
                isAuthenticated: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.userToken = payload?.accessToken;  // Update token
            })
            .addCase(userLogin.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.userToken = null;
                state.user = null;
            })

            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = payload;  // Store user details in state
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.userToken = null;
                state.user = null;
            });
    },
});

export const { logout } = userSlice.actions;

// export default userSlice.reducer;
export default userSlice.reducer;