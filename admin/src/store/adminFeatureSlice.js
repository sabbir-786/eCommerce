import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featureImageList: [],
    error: null,
};

// ✅ Get all feature images
export const getAdminFeatureImages = createAsyncThunk(
    "admin/getFeatureImages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/feature/get", {
                withCredentials: true,
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch features");
        }
    }
);

// ✅ Add a new feature image
export const addAdminFeatureImage = createAsyncThunk(
    "admin/addFeatureImage",
    async (image, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/admin/feature/add",
                { image },
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to add feature");
        }
    }
);

const adminFeatureSlice = createSlice({
    name: "adminFeature",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch
            .addCase(getAdminFeatureImages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAdminFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data || [];
            })
            .addCase(getAdminFeatureImages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.featureImageList = [];
            })

            // Add
            .addCase(addAdminFeatureImage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addAdminFeatureImage.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.data) {
                    state.featureImageList.push(action.payload.data);
                }
            })
            .addCase(addAdminFeatureImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default adminFeatureSlice.reducer;