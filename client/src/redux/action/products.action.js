import axios from "axios"
import { ADD_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS } from "../ActionType"
import { baseURL } from "../../utils/baseURL"

const loadingProducts = () => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS })
}

const errorProduct = (error) => async (dispatch) => {
    dispatch({ type: ERROR_PRODUCTS, payload: error })
}

export const getProducts = () => (dispatch) => {

    try {
        dispatch(loadingProducts())

        // setTimeout(() => {
        axios.get(baseURL + 'product')
            .then((response) => {
                dispatch({ type: GET_PRODUCTS, payload: response.data })
            })
            .catch((error) => {
                dispatch(errorProduct(error.message));
            })
        // }, 2000)


    } catch (error) {
        dispatch(errorProduct(error.message));
    }


}

export const addProduct = (data) => async (dispatch) => {
    try {
        dispatch(loadingProducts())

        await axios.post(baseURL + 'product', data)
            .then((response) => dispatch({ type: ADD_PRODUCTS, payload: response.data }))
            .catch((error) => {
                dispatch(errorProduct(error.message));
            })
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch(loadingProducts())

        await axios.delete(baseURL + 'product/' + id)
            .then(dispatch({ type: DELETE_PRODUCTS, payload: id }))
            .catch((error) => {
                dispatch(errorProduct(error.message));
            })
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
}

export const editProduct = (data) => async (dispatch) => {
    try {
        dispatch(loadingProducts())

        await axios.put(baseURL + 'product/' + data.id, data)
            .then((response) => {
                dispatch({ type: EDIT_PRODUCTS, payload: data })
            })
            .catch((error) => {
                dispatch(errorProduct(error.message));
            })
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
}