import { Children, createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
    user : JSON.parse(localStorage.getItem('userm')) || null,
    isFetching : false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuhContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {

        localStorage.setItem('userm', JSON.stringify(state.user))
        console.log('statem', state);
      
    }, [state.user]);

    return (
        <AuthContext.Provider
        
        value={{
            user : state.user,
            isFetching: state.isFetching,
            error : state.error,
            dispatch,

        }}
        >
            { children }
        </AuthContext.Provider>
    )
    
}