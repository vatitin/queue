import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {useParams, useNavigate} from'react-router-dom';
import { therapistProfile } from "../../endpoints"
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

function Profile() {
    
    const navigate = useNavigate();
    const {therapistId} = useParams();
    let {userId} = useSessionContext();
    const [therapist, setTherapist] = useState([]);
  
    useEffect(() => {
      const config = {
          headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
      }
      try {
        axios.get(therapistProfile, config).then((response) => {
          setTherapist(response.data);
        });
      } catch (error) {
        console.error(error);
      }
  
    }, [therapistId, userId, navigate]);

    return (
        <div>
            <div>{therapist.lastName ? therapist.lastName : "-"}</div>
            <div>{therapist.firstName ? therapist.firstName : "-"}</div>
            <div>{therapist.email}</div>
        </div>

    );
}

export {Profile}