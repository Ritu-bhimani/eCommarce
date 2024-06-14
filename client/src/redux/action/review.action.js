import axios from "axios"
import { ADD_REVIEWS, DELETE_REVIEWS, EDIT_REVIEWS, GET_REVIEWS } from "../ActionType";
import { baseURL } from "../../utils/baseURL";

export const getReview = () => (dispatch) => {
    try {
        axios.get(baseURL + 'reviews')
            .then((response) => {
                dispatch({ type: GET_REVIEWS, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

    } catch (error) {

    }

}

export const addReview = (data) => async (dispatch) => {

    await axios.post(baseURL + 'reviews', data)
        .then((response) => {
            console.log(response.data);
            dispatch({ type: ADD_REVIEWS, payload: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
}

export const deleteReview = (id) => async (dispatch) => {
    try {
        await axios.delete(baseURL + 'reviews/' + id)
            .then(dispatch({ type: DELETE_REVIEWS, payload: id }))
            .catch((error) => {

            })
    } catch (error) {

    }
}

export const updateReview = (data) => async (dispatch) => {
    try {
        await axios.put(baseURL + 'reviews/' + data.id, data)
            .then((response) => {
                console.log(response.data);
                dispatch({ type: EDIT_REVIEWS, payload: data })
            })
            .catch()

    } catch (error) {
        console.log(error);
    }
}