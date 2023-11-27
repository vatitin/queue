import { useState } from 'react' 
import { useAuthContext } from './useAuthContext'
import axios from "axios";
import { loginTherapist } from "../endpoints"


export const useLogin = () => {
    const [error, setError]  = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        
                //todo check if this is necessary
        const data = {
            email: email,
            password: password,
        };
    
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
    
        const response = await instance.post(loginTherapist, data, config)

        if (!response.status === 200) {
            setIsLoading(false)
            setError(response.error)
        }
        if (response.status === 200) {
            dispatch({type: 'LOGIN', payload: {email: response.data.email, id: response.data.id}})
            
            setIsLoading(false)
        }
    } 
    return { login, isLoading, error}

}