import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [patients, setPatients] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/patients").then((response) => {
      setPatients(response.data);
    });
  }, []);

  return (


    <div>
      <div className="patientEntry">
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

export { Home };
