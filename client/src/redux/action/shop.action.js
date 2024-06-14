import axios from "axios"
import { GET_SHOPDATA } from "../ActionType";
import { baseURL } from "../../utils/baseURL";

export const getShopData = () => (dispatch) => {
    try {
        axios.get(baseURL + 'fruits')
            .then((response) => {
                dispatch({ type: GET_SHOPDATA, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

    } catch (error) {

    }


}