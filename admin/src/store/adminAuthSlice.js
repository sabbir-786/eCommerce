import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const adminLogin = createAsyncThunk("admin/login", async (formData) => {
    const response = await axios.post(
        "http://localhost:5000/api/admin/auth/login",
        formData,
        { withCredentials: true }
    );
    return response.data;
});



export const adminLogout = createAsyncThunk("admin/logout", async () => {
    const response = await axios.post(
        "http://localhost:5000/api/admin/auth/logout",
        {},
        { withCredentials: true }
    );
    return response.data;
});

export const adminCheckAuth = createAsyncThunk("admin/checkauth", async () => {
    const response = await axios.get(
        "http://localhost:5000/api/admin/auth/check-auth",
        {
            withCredentials: true,
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate",
            },
        }
    );
    return response.data;
});

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(adminLogin.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })



            .addCase(adminCheckAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })

            .addCase(adminCheckAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(adminLogout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export default adminAuthSlice.reducer;