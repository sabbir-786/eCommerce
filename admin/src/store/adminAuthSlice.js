import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

// ✅ Admin Login
export const adminLogin = createAsyncThunk("admin/login", async (formData, { rejectWithValue }) => {
    try {
        const res = await axios.post(
            "http://localhost:5000/api/admin/login",
            formData,
            { withCredentials: true }
        );
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { success: false, message: "Login failed" });
    }
});

// ✅ Admin Logout
export const adminLogout = createAsyncThunk("admin/logout", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.post(
            "http://localhost:5000/api/admin/logout",
            {},
            { withCredentials: true }
        );
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { success: false });
    }
});

// ✅ Admin Auth Check
export const adminCheckAuth = createAsyncThunk("admin/checkauth", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(
            "http://localhost:5000/api/admin/check-auth",
            {
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                },
            }
        );
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { success: false });
    }
});

// Admin Auth Slice
const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(adminLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success && action.payload.user?.role === "admin";
            })
            .addCase(adminLogin.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // CHECK AUTH
            .addCase(adminCheckAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminCheckAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success && action.payload.user?.role === "admin";
            })
            .addCase(adminCheckAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // LOGOUT
            .addCase(adminLogout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export default adminAuthSlice.reducer;
