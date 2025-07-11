import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const shopLogin = createAsyncThunk("shop/login", async (formData) => {
    const response = await axios.post(
        "http://localhost:5000/api/shop/auth/login",
        formData,
        { withCredentials: true }
    );
    return response.data;
});

export const shopRegister = createAsyncThunk("shop/register", async (formData) => {
    const response = await axios.post(
        "http://localhost:5000/api/shop/auth/register",
        formData,
        { withCredentials: true }
    );
    return response.data;
});

export const shopLogout = createAsyncThunk("shop/logout", async () => {
    const response = await axios.post(
        "http://localhost:5000/api/shop/auth/logout",
        {},
        { withCredentials: true }
    );
    return response.data;
});

export const shopCheckAuth = createAsyncThunk("shop/checkauth", async () => {
    const response = await axios.get(
        "http://localhost:5000/api/shop/auth/check-auth",
        {
            withCredentials: true,
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate",
            },
        }
    );
    return response.data;
});

const shopAuthSlice = createSlice({
    name: "shopAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(shopLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(shopLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(shopLogin.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(shopRegister.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(shopCheckAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })

            .addCase(shopCheckAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(shopLogout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export default shopAuthSlice.reducer;
