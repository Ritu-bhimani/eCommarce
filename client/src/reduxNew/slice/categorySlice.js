import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

// Fetch category data
export const fetchCategoryData = createAsyncThunk(
    'category/fetchCategoryData',
    async () => {
        try {
            const response = await axios.get(`${baseURL}/categories/list-categories`);
            console.log(response);
            return response?.data?.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

// Add category
export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (categoryData) => {
        try {
            const response = await axios.post(`${baseURL}/categories/add-categories`, categoryData);
            return response.data; // Assuming the response data contains the newly added category
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

// Edit category
export const editCategory = createAsyncThunk(
    'category/editCategory',
    // async (data) => {
    async ({ formData, id }) => {
        try {
            // console.log(data, "formData._id");
            const response = await axios.put(`${baseURL}/categories/edit-categories/${id}`, formData, {
                // const response = await axios.put(`${baseURL}/categories/edit-categories/${data?._id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            console.log(err, "responseresponse");
            console.log(err);
            throw err;
        }
    }
);

// Delete category
export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (categoryId) => {
        try {
            const response = await axios.delete(`${baseURL}/categories/delete-categories/${categoryId}`);
            return { _id: categoryId }; // Returning the id of the deleted category
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

// Category slice
const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategoryData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload || [];
            })
            .addCase(fetchCategoryData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = [...state.data, action.payload];
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(editCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                console.log(action, state, "action");
                state.isLoading = false;
                const index = state.data?.findIndex(category => category?._id === action?.payload?._id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data?.filter(category => category?._id !== action?.payload?._id);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export default categorySlice.reducer;
