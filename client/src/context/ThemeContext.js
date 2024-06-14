import { createContext, useReducer } from "react"
import { themeReducer } from "./reducer/theme.reducer"
import { TOGGEL_THEME } from "./ActionType"

const initialState = {
    theme: 'light'
}

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(themeReducer, initialState);

    const toggleTheme = (val) => {
        console.log(val);

        const Theme = val === 'light' ? 'dark' : 'light';

        dispatch({ type: TOGGEL_THEME, payload: Theme })
    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}