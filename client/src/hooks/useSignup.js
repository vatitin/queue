import { useState } from 'react' 
import axios from "axios";
import { registerTherapist } from "../endpoints"

export const useSignup = () => {
    const [error, setError]  = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const signup = async (userData) => {
        setIsLoading(true)
        setError(null)

        const config = {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
        }
        
        const instance = axios.create({
            validateStatus: (status) => {
              return (status >= 200 && status < 300) || status === 409;
            },
          })

        instance.post(registerTherapist, userData, config).then(response => {
            if (response.status === 201) {
                return;
            } else if (response.status === 409) {
                setIsLoading(false)
                setError("Email existiert bereits!")
            } else {
                setIsLoading(false)
                setError(response.error)
            }
        })
        
    } 
    return { signup, isLoading, error}

}