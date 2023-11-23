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
    } else if (patientStatus !== "WAITING" && patientStatus !== "ACTIVE") {
      return navigate("*")
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

  const headLine = () => {
    if (patientStatus === "WAITING") {
      return "Meine Warteliste"
    } else {
      return "Meine Patienten"
    }
  } 

  return (
    <div className="container">
      <h1 className="text-center mb-5 mt-3">{headLine()}</h1>
      <table className="table table-striped table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">Nachname</th>
            <th scope="col">Vorname</th>
            <th scope="col">Email</th>
            <th scope="col">Geschlecht</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patients.map((value) => (
            <tr>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.lastName ? value.lastName : "-"}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.firstName ? value.firstName : "-"}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.email}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.gender ? value.gender : "-"}</td>
              <td><button type="button" class="btn btn-danger btn-sm" onClick={() => removePatient(value.id)}>Entfernen</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class="d-grid gap-2 mb-3 col-6 mx-auto" onClick={() => {navigate(`/addNewPatient/${patientStatus}`)}}>
        <button className="btn btn-primary btn-secondary" type="button" >Patient hinzufügen</button>
      </div>
    </div>
  );
}

export { MyPatients };
