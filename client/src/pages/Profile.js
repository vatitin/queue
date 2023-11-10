import React, {useContext} from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {useParams, useNavigate} from'react-router-dom';
import { AuthContext } from "../helpers/AuthContext"

function Profile() {
    
    const navigate = useNavigate();
    const {therapistId} = useParams();
    const { authState } = useContext(AuthContext);
    const [therapist, setTherapist] = useState([]);
  
    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json"
                },
                withCredentials: true
        }
      if (!authState.status) {
        return navigate("/loginTherapist")
      }
      try {
        axios.get(`http://localhost:3001/therapists/myProfile`, config).then((response) => {
          setTherapist(response.data);
        });
      } catch (error) {
        console.error(error);
      }
  
    }, [therapistId, authState.status, navigate]);
  

    return (
        <div>
            <div>{therapist.lastName ? therapist.lastName : "-"}</div>
            <div>{therapist.firstName ? therapist.firstName : "-"}</div>
            <div>{therapist.email}</div>
        </div>

    );
    

}

export {Profile}