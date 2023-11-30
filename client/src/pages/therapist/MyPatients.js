import React from "react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from'react-router-dom';
import { patientsWithStatus, deletePatientWithId, patientWithId } from "../../endpoints"
import { useAuthContext } from '../../hooks/useAuthContext'
import Cookies from 'js-cookie';

function MyPatients() {
  const {patientStatus} = useParams();
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const config = useMemo(() => {
    return {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
    }
    }, []) 

  const loginStatus = Cookies.get("logged_in")
  useEffect(() => {
    if (!loginStatus) {
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

  }, [config, user, loginStatus, navigate, patientStatus]);

  const removePatient = async (id, event) => {
    event.stopPropagation();

    const result = await axios.delete(deletePatientWithId(id), config)
    if (result.status === 204) {
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    }
  }

  const updatePatientStatus = async (id, status, event) => {
    event.stopPropagation();

    const result = await axios.patch(patientWithId(id), {status}, config)
    if (result.status === 200) {
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
            <th scope="col">Handynummer</th>
            <th scope="col">Geschlecht</th>
            <th scope="col">Statusänderung</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((value) => (
            <tr>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.lastName ? value.lastName : "-"}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.firstName ? value.firstName : "-"}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.email}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.phoneNumber ? value.phoneNumber : "-"}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>{value.gender ? value.gender : "-"}</td>
              <td onClick={() => {navigate(`/patient/${value.id}`)}}>
              {(patientStatus === "WAITING") && (
                  <>
                    <button type="button" className="btn btn-success btn-sm" onClick={(e) => updatePatientStatus(value.id, "ACTIVE",e)}>Hinzufügen</button>
                  </>)}
              <button type="button" className="btn btn-danger btn-sm" onClick={(e) => removePatient(value.id, e)}>Entfernen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-grid gap-2 mb-3 col-6 mx-auto" onClick={() => {navigate(`/addNewPatient/${patientStatus}`)}}>
        <button className="btn btn-primary btn-secondary" type="button" >Patient hinzufügen</button>
      </div>
    </div>
    
  );
}

export { MyPatients };
