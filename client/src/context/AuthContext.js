import {  createContext, useEffect, useReducer } from 'react'


//React context
//AuthContext to manage state (for login/signup) using useReducer, that can be easily accessed by any component 
export const AuthContext = createContext()

//Reducer function
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return { user: action.payload}
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

//ContextProvider
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //when the react application first starts, useEffect will get the token saved in the local storage 
    //(saved first from signup) and update the AuthContext state so the user object (that contains the 
    //json object/response data from the server) doesn't revert to null when the page refreshes or reloads 
    //to still display the user on the navbar
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) //parse to an object because anything stored in 
        //local storage becomes a json string hence we convert back to an object we can use in javascript

        if (user) {
            dispatch({ type: 'LOGIN', payload: user}) //updates the AuthContext state
        }
    }, [])

    console.log('AuthContext: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
