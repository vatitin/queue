import axios from "axios"
import { logoutTherapist } from "../endpoints"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const config = {
        headers: {
            "Content-Type": "application/json"
            },
            withCredentials: true
    }

    const logout = async () => {
        const response = await axios.get(logoutTherapist, config);
        if (response.data.error) return alert(response.data.error)
        dispatch({type: 'LOGOUT'})
    }

    return { logout };
}