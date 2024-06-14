import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL } from "../../utils/baseURL"

export const addCoupon = createAsyncThunk(
    'coupon/add',
    async (data) => {
        const response = await axios.post(baseURL + 'coupon', data);
        console.log(response);

        return response.data;
    }
)

export const getCoupon = createAsyncThunk(
    'coupon/get',
    async () => {
        const response = await axios.get(baseURL + 'coupon')

        return response.data;
    }
)

export const deleteCoupon = createAsyncThunk(
    'coupon/delete',

    async (id) => {
        await axios.delete(baseURL + 'coupon/' + id)

        return id;
    }
)

export const editCoupon = createAsyncThunk(
    'coupon/edit',

    async (data) => {
        axios.put(baseURL + 'coupon/' + data.id, data);

        return data
    }
)

const initialState = {
    isLoading: false,
    coupon: [],
    error: null
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.concat(action.payload)
        });

        builder.addCase(getCoupon.fulfilled, (state, action) => {
            state.coupon = action.payload
        });

        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.filter((v) => v.id !== action.payload)
        });

        builder.addCase(editCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }

})

export default couponSlice.reducer