import { createContext, useReducer } from "react"
import { ADD_BESTSELLER, DELETE_BESTSELLER, GET_BESTSELLER } from "./ActionType";
import { bestSellerReducer } from "./reducer/bestSeller.reducer";
import axios from "axios";
import { baseURL } from "../utils/baseURL";

const initialState = {
    isLoading: false,
    bestSeller: [],
    error: null
}

export const bestSellerContext = createContext()

export const BestSellerProvider = ({ children }) => {

    const [state, dispatch] = useReducer(bestSellerReducer, initialState);

    const getBestSeller = async () => {
        await axios.get(baseURL + 'bestSeller')
            .then((response) => {
                dispatch({ type: GET_BESTSELLER, payload: response.data })
            })
    }

    const addBestSeller = async (data) => {

        await axios.post(baseURL + 'bestSeller', data)
            .then((response) => {
                dispatch({ type: ADD_BESTSELLER, payload: response.data })
            })


    }

    const deleteBestSeller = async (id) => {

        await axios.delete(baseURL + 'bestSeller/' + id)
            .then((response) => {
                dispatch({ type: DELETE_BESTSELLER, payload: response.data })

            })

    }

    return (
        <bestSellerContext.Provider
            value={{
                ...state,
                getBestSeller,
                addBestSeller,
                deleteBestSeller
            }}
        >
            {children}
        </bestSellerContext.Provider>
    )
}