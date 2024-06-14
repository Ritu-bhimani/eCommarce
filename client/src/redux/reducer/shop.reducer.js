import { GET_SHOPDATA } from "../ActionType";

const initialState = {
    isLoading: false,
    shop: [],
    error: null
}

export const shopReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SHOPDATA:
            return {
                isLoading: false,
                shop: action.payload,
                error: null,
            }

        default:
            return state;
    }
}