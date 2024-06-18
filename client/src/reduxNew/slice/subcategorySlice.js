// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"
// import { BASE_URL, otherURL } from "../../utils/baseURL";

// export const addSubCategory = createAsyncThunk(
//     'subCategories/add-subCategories',
//     async (data) => {
//         const response = await axios.post(BASE_URL + 'subCategories', data);

//         return response.data;
//     }
// )

// export const getSubCategory = createAsyncThunk(
//     'subCategories/list-subCategories/get',

//     async () => {
//         const response = await axios.get(BASE_URL + 'subCategories')
//         return response.data;
//     }
// )

// export const deleteSubCategory = createAsyncThunk(
//     'subCategories/delete-subCategories',

//     async (_id) => {
//         await axios.delete(BASE_URL + 'subCategories/' + _id)
//         return _id;
//     }
// )

// export const editSubCategory = createAsyncThunk(
//     'subCategories/edit-subCategories',

//     async (data) => {
//         await axios.put(BASE_URL + 'subCategories/' + data._id, data);

//         return data
//     }
// )

// const initialState = {
//     isLoading: false,
//     subcategory: [],
//     error: null
// }

// const subcategorySlice = createSlice({
//     name: 'subCategories',
//     initialState,
//     reducers: {

//     },

//     extraReducers: (builder) => {

//         builder.addCase(getSubCategory.fulfilled, (state, action) => {
//             console.log(action.payload);
//             state.subcategory = action.payload.data
//         });

//         builder.addCase(addSubCategory.fulfilled, (state, action) => {
//             console.log(action.payload, state);
//             state.subcategory = state.subcategory.concat(action.payload.data);
//         });

//         builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
//             console.log(action, state);
//             state.subcategory = state.subcategory.filter((v) => v._id !== action.payload);
//         });

//         builder.addCase(editSubCategory.fulfilled, (state, action) => {
//             console.log(action, state);
//             state.subcategory = state.subcategory.map((v) => {
//                 if (v._id === action.payload._id) {
//                     return action.payload;
//                 } else {
//                     return v;
//                 }
//             });
//         });


//     }
// })

// export default subcategorySlice.reducer

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

// Fetch category data
export const fetchSubCategoryData = createAsyncThunk(
    'subCategories/fetchSubCategoryData',
    async () => {
        try {
            const response = await axios.get(`${baseURL}/subCategories/list-subCategories`);
            console.log(response?.data?.data, "subCategoryList");
            return response?.data?.data; // Assuming the response data contains the categories
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

// Add category
export const addSubCategory = createAsyncThunk(
    'subCategories/addCategory',
    async (categoryData) => {
        try {
            const response = await axios.post(`${baseURL}/subCategories/add-subCategories`, categoryData);
            return response.data; // Assuming the response data contains the newly added category
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

// Edit category
export const editSubCategory = createAsyncThunk(
    'subCategories/editCategory',
    async (categoryData) => {
        try {
            const response = await axios.put(`${baseURL}/subCategories/edit-subCategories/${categoryData._id}`, categoryData);
            return response.data; // Assuming the response data contains the updated category
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

// Delete category
export const deleteSubCategory = createAsyncThunk(
    'subCategories/deleteCategory',
    async (categoryId) => {
        try {
            const response = await axios.delete(`${baseURL}/subCategories/delete-subCategories/${categoryId}`);
            return { _id: categoryId }; // Returning the id of the deleted category
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
);

// Category slice
const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubCategoryData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSubCategoryData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload || []; // Ensure payload is not undefined
            })
            .addCase(fetchSubCategoryData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addSubCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addSubCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = [...state.data, action.payload]; // Use spread operator to ensure immutability
            })
            .addCase(addSubCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(editSubCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editSubCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.data?.findIndex(category => category?._id === action?.payload?._id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(editSubCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteSubCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data?.filter(category => category?._id !== action?.payload?._id);
            })
            .addCase(deleteSubCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export default subcategorySlice.reducer;
