import { ADD_CONTACT } from "../ActionType";

export const contactReducer = (state, action) => {
    console.log(action.type);

    switch (action.type) {
        case ADD_CONTACT:
            return {
                isLoading: false,
                contact: state.contact.concat(action.payload),
                error: null
            }

        default:
            break;
    }

}