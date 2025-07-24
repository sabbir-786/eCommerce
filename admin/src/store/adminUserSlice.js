import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = "http://localhost:5000/api/admin/users";

// 1. Fetch all users
export const fetchAdminUsers = createAsyncThunk("adminUsers/fetch", async (_, thunkAPI) => {
    try {
        const res = await axios.get(BASE_URL, { withCredentials: true });
        return res.data.users;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
});

// 2. Update user info
export const updateAdminUser = createAsyncThunk("adminUsers/update", async ({ id, data }, thunkAPI) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, data, {
            withCredentials: true,
        });
        toast.success("User updated");
        return response.data.user;
    } catch (error) {
        const msg = error.response?.data?.message || "Update failed";
        toast.error(msg);
        return thunkAPI.rejectWithValue(msg);
    }
});

// 3. Delete user
export const deleteAdminUser = createAsyncThunk("adminUsers/delete", async (id, thunkAPI) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
        toast.success("User deleted");
        return id;
    } catch (err) {
        const msg = err.response?.data?.message || "Failed to delete user";
        toast.error(msg);
        return thunkAPI.rejectWithValue(msg);
    }
});

// 4. Reset user password
export const resetAdminUserPassword = createAsyncThunk("adminUsers/resetPassword", async ({ id, newPassword }, thunkAPI) => {
    try {
        const res = await axios.put(`${BASE_URL}/${id}/reset-password`, { newPassword }, { withCredentials: true });
        toast.success("Password reset successfully");
        return res.data.message;
    } catch (err) {
        const msg = err.response?.data?.message || "Failed to reset password";
        toast.error(msg);
        return thunkAPI.rejectWithValue(msg);
    }
});

// 5. Block or Unblock user
export const blockUnblockUser = createAsyncThunk("adminUsers/toggleBlock", async (id, thunkAPI) => {
    try {
        const res = await axios.put(`${BASE_URL}/${id}/block-toggle`, {}, { withCredentials: true });
        toast.success(`User ${res.data.isBlocked ? "blocked" : "unblocked"}`);
        return res.data.user;
    } catch (err) {
        const msg = err.response?.data?.message || "Failed to toggle block";
        toast.error(msg);
        return thunkAPI.rejectWithValue(msg);
    }
});

const adminUserSlice = createSlice({
    name: "adminUsers",
    initialState: {
        users: [],
        isLoading: false,
        error: null,
        searchTerm: "",
        sortField: "createdAt",
        sortOrder: "desc",
    },
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setSortField(state, action) {
            state.sortField = action.payload;
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchAdminUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAdminUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchAdminUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateAdminUser.fulfilled, (state, action) => {
                state.users = state.users.map((user) =>
                    user._id === action.payload._id ? action.payload : user
                );
            })

            // Delete
            .addCase(deleteAdminUser.fulfilled, (state, action) => {
                state.users = state.users.filter((u) => u._id !== action.payload);
            })

            // Toggle Block
            .addCase(blockUnblockUser.fulfilled, (state, action) => {
                state.users = state.users.map((user) =>
                    user._id === action.payload._id ? action.payload : user
                );
            });
    },
});

export const {
    setSearchTerm,
    setSortField,
    setSortOrder,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
