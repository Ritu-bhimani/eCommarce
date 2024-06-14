import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slice/categorySlice";

export const store = configureStore({
    reducer: {
        categoryDetails :categorySlice
    }
})