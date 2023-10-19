import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useParams} from'react-router-dom';

function Patients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const {therapistId} = useParams();

  const config = {
    headers: {
      "Content-Type": "application/json"
      },
      withCredentials: true
    }

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/therapists/getPatients/${therapistId}`, config).then((response) => {
        setPatients(response.data);
      });
    } catch (error) {
      console.error(error);
    }

  }, [therapistId]);

  return (
    <div>
        <div className="patientEntry" onClick={() => {navigate(`/addNewPatient/${therapistId}`)}}>
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
            </div>
          );
      })}
    </div>
  );
}

export { Patients };
