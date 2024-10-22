import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusType } from '../../constants';
import { PatientRow } from './PatientRow';
import { fetchPatientsWithStatus, deletePatient, patchPatientStatus } from '../../API';
import { HttpStatusCode } from 'axios';

function MyPatients() {
  const { patientStatus } = useParams();
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const config = useMemo(() => ({
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  }), []);

  useEffect(() => {
    if (patientStatus !== StatusType.WAITING && patientStatus !== StatusType.ACTIVE) {
      return navigate('*');
    }

    const loadPatients = async () => {
      try {
        const response = await fetchPatientsWithStatus(patientStatus, config);
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPatients();
  }, [config, navigate, patientStatus]);

  const handleRemovePatient = async (id, event) => {
    event.stopPropagation();
    const result = await deletePatient(id, config);
    if (result.status === HttpStatusCode.Ok) {
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    }
  };

  const handleUpdatePatientStatus = async (id, status, event) => {
    event.stopPropagation();
    const result = await patchPatientStatus(id, status, config);
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
