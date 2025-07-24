import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------ CATEGORIES ------------------
export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {
    const res = await axios.get("http://localhost:5000/api/admin/categories");
    return res.data;
});

export const createCategory = createAsyncThunk("category/createCategory", async (name) => {
    const res = await axios.post("http://localhost:5000/api/admin/categories", { name });
    return res.data;
});

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/categories/${id}`);
    return id;
});

// ------------------ BRANDS ------------------
export const fetchBrand = createAsyncThunk("category/fetchBrand", async () => {
    const res = await axios.get("http://localhost:5000/api/admin/brand");
    return res.data;
});

export const createBrand = createAsyncThunk("category/createBrand", async (name) => {
    const res = await axios.post("http://localhost:5000/api/admin/brand", { name });
    return res.data;
});

export const deleteBrand = createAsyncThunk("category/deleteBrand", async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/brand/${id}`);
    return id;
});

// ------------------ SLICE ------------------
const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        brands: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // --- CATEGORIES ---
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.unshift(action.payload);
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter((cat) => cat._id !== action.payload);
            })

            // --- BRANDS ---
            .addCase(fetchBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.brands.unshift(action.payload);
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.brands = state.brands.filter((brand) => brand._id !== action.payload);
            });
    },
});

export default categorySlice.reducer;
    