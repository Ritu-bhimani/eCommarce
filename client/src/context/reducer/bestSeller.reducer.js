import { ADD_BESTSELLER, DELETE_BESTSELLER, GET_BESTSELLER } from "../ActionType";


export const bestSellerReducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case GET_BESTSELLER:
            return {
                ...state,
            }

        case ADD_BESTSELLER:
            return {
                isLoading: false,
                bestSeller: state.bestSeller.concat(action.payload),
                error: null
            }

        case DELETE_BESTSELLER:
            return {
                isLoading: false,
                bestSeller: state.bestSeller.filter((v) => v.id !== action.payload),
                error: null
            }

        default:
            return state;
    }
}