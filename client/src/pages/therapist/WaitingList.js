import React, {useContext} from "react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import {useParams, useNavigate} from'react-router-dom';
import { AuthContext } from "../../helpers/AuthContext"

function WaitingList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const {therapistId} = useParams();
  const { authState } = useContext(AuthContext);

  const config = useMemo(() => {
    return {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
    }
    }, []) 

  useEffect(() => {
    if (!authState.status) {
      return navigate("/loginTherapist")
    }
    try {
      axios.get(`http://localhost:3001/therapist/waitingList/myPatients`, config).then((response) => {
        setPatients(response.data);
      });
    } catch (error) {
      console.error(error);
    }

  }, [therapistId, config, authState.status, navigate]);

  
const removePatient = (id) => {
  axios.delete(`http://localhost:3001/therapist/waitingList/deletePatient/${id}`, config)
  .then((response) => {
    console.log(response.message)
      navigate(`/waitingList`,);
  })
}

  return (
    <div>
        <div className="patientEntry" onClick={() => {navigate(`/addNewPatient`)}}>
            <div>Patient hinzufügen</div>
        </div>
        <div className="patientEntryHeader">
        <div>ID</div>
        <div>Last Name</div>
        <div>First Name</div>
        <div>Email</div>
    </div>
      {patients.map((value, key) => {
          return (
            <div className="patientEntry" onClick={() => {navigate(`/patient/${value.id}`)}}>
              <div>{value.id}</div>
              <div>{value.lastName ? value.lastName : "-"}</div>
              <div>{value.firstName ? value.firstName : "-"}</div>
              <div>{value.email}</div>
              <button onClick={() => removePatient(value.id)}>Entfernen</button>
            </div>
          );
      })}
    </div>
  );
}

export { WaitingList };
