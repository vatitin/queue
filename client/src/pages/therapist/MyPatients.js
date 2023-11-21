import React, {useContext} from "react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from'react-router-dom';
import { AuthContext } from "../../helpers/AuthContext"
import { patientsWithStatus, deletePatientWithId } from "../../endpoints"

function MyPatients() {
  const {patientStatus} = useParams();
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
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
      axios.get(patientsWithStatus(patientStatus), config).then((response) => {
        setPatients(response.data);
      });
    } catch (error) {
      console.error(error);
    }

  }, [config, authState.status, navigate, patientStatus]);

  
  const removePatient = async (id) => {
    const result = await axios.delete(deletePatientWithId(id), config)
    if (result.status === 204) {
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    }
  }

  return (
    <div>
      <h1>{patientStatus}</h1>
      <div className="patientEntry" onClick={() => {navigate(`/addNewPatient/${patientStatus}`)}}>
        <div>Patient hinzufügen</div>
      </div>
      <table className="patientTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((value, key) => (
            <tr key={key}>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.id}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.lastName ? value.lastName : "-"}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.firstName ? value.firstName : "-"}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.email}</td>
              <td><button onClick={() => removePatient(value.id)}>Entfernen</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { MyPatients };
