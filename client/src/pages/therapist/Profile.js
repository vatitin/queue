import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {useParams, useNavigate} from'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'
import { therapistProfile } from "../../endpoints"
import Cookies from 'js-cookie';

function Profile() {
    
    const navigate = useNavigate();
    const {therapistId} = useParams();
    const { user } = useAuthContext()
    const [therapist, setTherapist] = useState([]);
  
    useEffect(() => {
      const config = {
          headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
      }
      if (!Cookies.get("logged_in")) {
        return navigate("/loginTherapist")
      }
      try {
        axios.get(therapistProfile, config).then((response) => {
          setTherapist(response.data);
        });
      } catch (error) {
        console.error(error);
      }
  
    }, [therapistId, user, navigate]);

    return (
        <div>
            <div>{therapist.lastName ? therapist.lastName : "-"}</div>
            <div>{therapist.firstName ? therapist.firstName : "-"}</div>
            <div>{therapist.email}</div>
        </div>

    );
}

export {Profile}