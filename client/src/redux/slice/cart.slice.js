import { createSlice } from "@reduxjs/toolkit"
import { act } from "react-dom/test-utils";

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            console.log(action);

            const index = state.cart.findIndex((v) => v.p_id === action.payload.id)
            console.log(index);

            if (index !== -1) {
                state.cart[index].quantity += action.payload.count;
            } else {
                state.cart.push({ p_id: action.payload.id, quantity: action.payload.count })
            }


        },

        incrementqnt: (state, action) => {
            console.log(action.payload);

            const index = state.cart.findIndex((v) => v.p_id === action.payload)
            console.log(index);

            console.log(state.cart.quantity);

            state.cart[index].quantity++;
        },

        decrementqnt: (state, action) => {
            console.log(action);

            const index = state.cart.findIndex((v) => v.p_id === action.payload)
            console.log(index);

            console.log(state.cart.quantity);

            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity--;
            }
        },

        deleteData: (state, action) => {
            console.log(action);

            const fData = state.cart.filter((v) => v.p_id !== action.payload);
            console.log(fData);

            state.cart = fData;
        }
    }
})

export const { addCart, incrementqnt, decrementqnt, deleteData } = cartSlice.actions

export default cartSlice.reducer