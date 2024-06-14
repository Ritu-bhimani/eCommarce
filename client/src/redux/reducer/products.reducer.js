import { ADD_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS } from "../ActionType";

const initialState = {
    isLoading: null,
    products: [],
    error: false,
}

export const productsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOADING_PRODUCTS:
            return {
                ...state,
                isLoading: true,
            }

        case ERROR_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                error:action.payload
            }

        case GET_PRODUCTS:
            return {
                isLoading: null,
                products: action.payload,
                error: false,
            }

        case ADD_PRODUCTS:
            return {
                isLoading: null,
                products: state.products.concat(action.payload),
                error: false,
            }

        case DELETE_PRODUCTS:
            return {
                isLoading: null,
                products: state.products.filter((v) => v.id !== action.payload),
                error: false,
            }

        case EDIT_PRODUCTS:
            return {
                isLoading: null,
                products: state.products.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                }),
                error: false,
            }

        default:
            return state;
    }
}
