import { ADD_FACILITIES, DELETE_FACILITIES, EDIT_FACILITIES, GET_FACILITIES, LOADING_FACILITIES } from "../ActionType";

const inisialState = {
    isLoading: false,
    facilities: [],
    error: null
}

export const FacilitiesReducer = (state = inisialState, action) => {

    switch (action.type) {
        case LOADING_FACILITIES:
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case GET_FACILITIES:
            return {
                ...state
            }

        case ADD_FACILITIES:
            return {
                ...state,
                isLoading: false,
                facilities: state.facilities.concat(action.payload),
                error: null
            }

        case DELETE_FACILITIES:
            return {
                ...state,
                isLoading: false,
                facilities: state.facilities.filter((v) => v.id !== action.payload),
                error: null
            }

        case EDIT_FACILITIES:
            return {
                ...state,
                isLoading: false,
                error: null,
                facilities: state.facilities.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
            }


        default:
            return state
    }
} 