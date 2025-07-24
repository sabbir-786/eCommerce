import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    error: null,
    message: null,
};

// ✅ Add new product
export const addNewProduct = createAsyncThunk(
    "products/addNewProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/admin/products/add",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// ✅ Fetch all products
export const fetchAllProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/admin/products/get"
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// ✅ Edit product
export const editProduct = createAsyncThunk(
    "products/editProduct",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/admin/products/edit/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/admin/products/delete/${id}`
            );
            return { ...response.data, id };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // ✅ FETCH
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to fetch products";
            })

            // ✅ ADD
            .addCase(addNewProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList.push(action.payload.data);
                state.message = "Product added successfully";
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to add product";
            })

            // ✅ EDIT
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedProduct = action.payload.data;
                state.productList = state.productList.map((p) =>
                    p._id === updatedProduct._id ? updatedProduct : p
                );
                state.message = "Product updated successfully";
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to edit product";
            })

            // ✅ DELETE
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = state.productList.filter(
                    (p) => p._id !== action.payload.id
                );
                state.message = "Product deleted successfully";
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to delete product";
            });
    },
});

export default productSlice.reducer;
