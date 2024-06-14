import { useReducer } from "react";
import { createContext } from "react"
import { contactReducer } from "./reducer/contact.reducer";
import axios from "axios";
import { baseURL } from "../utils/baseURL";
import { ADD_CONTACT } from "./ActionType";

const initialState = {
    isLoading: false,
    contact: [],
    erroe: null
}

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = async (data) => {
        try {
            const response = await axios.post(baseURL + 'contacts', data)

            dispatch({ type: ADD_CONTACT, payload: response.data });
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteContact = async (id) => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <ContactContext.Provider
            value={{
                ...state,
                addContact
            }}
        >
            {children}
        </ContactContext.Provider>
    )
} 