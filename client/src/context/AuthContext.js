import {createContext, useReducer, useEffect} from 'react'
import {loginTherapist} from '../endpoints'
import axios from "axios"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return null
    } 
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const config = {
            headers: {
            "Content-Type": "application/json"
            },
            withCredentials: true
        }
    
        const instance = axios.create({
          validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 401 || status === 403;
          },
        })
    
        instance.get(loginTherapist, config)
        .then(response => {
            if (response.data.loggedIn) {
                dispatch({type: 'LOGIN', payload: {email : response.data.email, id: response.data.id}})

            } 
        })  
        }, [])
    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}