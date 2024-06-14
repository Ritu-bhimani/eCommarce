import { ADD_REVIEWS, DELETE_REVIEWS, EDIT_REVIEWS, GET_REVIEWS } from "../ActionType";

const initialState = {
    isLoading: false,
    reviews: [],
    error: null
}

export const reviewReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_REVIEWS:
            return {
                isLoading: false,
                reviews: action.payload,
                error: null,
            }

        case ADD_REVIEWS:
            return {
                isLoading: false,
                reviews: state.reviews.concat(action.payload),
                error: null,
            }

        case DELETE_REVIEWS:
            return {
                isLoading: false,
                reviews: state.reviews.filter((v) => v.id !== action.payload),
                error: null,
            }

        case EDIT_REVIEWS:
            return {
                isLoading: false,
                reviews: state.reviews.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }

                }),
                error: null
            }

        default:
            return state;
    }
}