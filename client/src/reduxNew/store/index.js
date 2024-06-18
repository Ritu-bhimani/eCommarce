import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slice/categorySlice";
import subcategorySlice from "../slice/subcategorySlice";

export const store = configureStore({
    reducer: {
        categoryDetails: categorySlice,
        subcategoryDetails: subcategorySlice
    }
})