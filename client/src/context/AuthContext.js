import {createContext, useReducer, useEffect} from 'react'
import {loginTherapist} from '../endpoints'
import axios from "axios"
import Cookies from 'js-cookie';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            Cookies.set("logged_in", "true")
            console.log("set cookie true")
            return { user: action.payload }
        case 'LOGOUT':
            Cookies.set("logged_in", "false")
            return { user: null }
        default:
            Cookies.set("logged_in", "false")
            return null
    } 
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
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
            } else {
                dispatch({type: 'Logout'})
            }
        })  
        }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}