import { ADD_FACILITIES, DELETE_FACILITIES, EDIT_FACILITIES, ERROR_FACILITIES, GET_FACILITIES, LOADING_FACILITIES } from "../ActionType"

const isLoading = () => (dispatch) => {
    dispatch({ type: LOADING_FACILITIES })
}

const error = () => (dispatch) => {
    dispatch({ type: ERROR_FACILITIES })
}

export const getFacilities = () => (dispatch) => {
    dispatch({type:GET_FACILITIES})
}

export const AddFacilities = (data) => (dispatch) => {
    dispatch(isLoading())
    dispatch(error())
    setTimeout(() => {
        dispatch({ type: ADD_FACILITIES, payload: data })
    }, 2000);
}

export const DeleteFacilities = (id) => (dispatch) => {
    dispatch(isLoading())
    setTimeout(() => {
        dispatch({ type: DELETE_FACILITIES, payload: id })
    }, 2000);
}

export const EditFacilities = (data) => (dispatch) => {
    dispatch(isLoading())
    setTimeout(() => {
        dispatch({ type: EDIT_FACILITIES, payload: data })
    }, 2000);
}

