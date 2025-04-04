import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusType } from '../../constants';
import { PatientRow } from './PatientRow';
import { HttpStatusCode } from 'axios';
import apiClient from '../../services/APIService';
import { deletePatientWithId, patientsWithStatus, updatePatient } from '../../endpoints';

function MyPatients() {
  const { patientStatus } = useParams();
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (patientStatus !== StatusType.WAITING && patientStatus !== StatusType.ACTIVE) {
      return navigate('*');
    }

    const loadPatients = async () => {
      try {
        const response = await apiClient.get(patientsWithStatus(patientStatus));
        console.log("response:  " + response);
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPatients();
  }, [navigate, patientStatus]);

  const handleRemovePatient = async (id, event) => {
    event.stopPropagation();
    const result = await apiClient.delete(deletePatientWithId(id));
    if (result.status === HttpStatusCode.Ok) {
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    }
  };

  const handleUpdatePatientStatus = async (id, status, event) => {
    event.stopPropagation();
    const result = await apiClient.patch(updatePatient(id, status));
    if (result.status === HttpStatusCode.Ok) {
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    }
  };

  const headLine = patientStatus === StatusType.WAITING ? 'Meine Warteliste' : 'Meine Patienten';

  return (
    <div className="container">
      <h1 className="text-center mb-5 mt-3">{headLine}</h1>
      <table className="table table-striped table-hover">
        <thead className="table-light">
          <tr>
            <th>Nr:</th>
            <th scope="col">Nachname</th>
            <th scope="col">Vorname</th>
            <th scope="col">Email</th>
            <th scope="col">Handynummer</th>
            <th scope="col">Geschlecht</th>
            <th scope="col">Statusänderung</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <PatientRow
              key={patient.id}
              patient={{ ...patient, sequence: index + 1 }}
              patientStatus={patientStatus}
              onRemove={handleRemovePatient}
              onUpdate={handleUpdatePatientStatus}
            />
          ))}
        </tbody>
      </table>
      <div className="d-grid gap-2 mb-3 col-6 mx-auto" onClick={() => navigate(`/addNewPatient/${patientStatus}`)}>
        <button className="btn btn-primary btn-secondary" type="button">
          Patient hinzufügen
        </button>
      </div>
    </div>
  );
}

export { MyPatients };
