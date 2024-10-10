import React from 'react';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  patientsWithStatus,
  deletePatientWithId,
  updatePatient,
} from '../../endpoints';
import { StatusType } from '../../constants';

function MyPatients() {
  const { patientStatus } = useParams();
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const config = useMemo(() => {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
  }, []);

  useEffect(() => {
    if (
      patientStatus !== StatusType.WAITING &&
      patientStatus !== StatusType.ACTIVE
    ) {
      return navigate('*');
    }
    try {
      axios.get(patientsWithStatus(patientStatus), config).then((response) => {
        setPatients(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [config, navigate, patientStatus]);

  const removePatient = async (id, event) => {
    event.stopPropagation();

    const result = await axios.delete(deletePatientWithId(id), config);
    if (result.status === 204) {
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== id),
      );
    }
  };

  const updatePatientStatus = async (id, status, event) => {
    event.stopPropagation();

    const result = await axios.patch(updatePatient(id, status), config);
    if (result.status === 200) {
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== id),
      );
    }
  };

  const headLine = () => {
    if (patientStatus === patientStatus.WAITING) {
      return 'Meine Warteliste';
    } else {
      return 'Meine Patienten';
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-5 mt-3">{headLine()}</h1>
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
          {patients.map((value) => (
            <tr
              onClick={() => {
                navigate(`/patient/${value.id}`);
              }}
            >
              <td>{value.sequence}</td>
              <td>{value.lastName ? value.lastName : '-'}</td>
              <td>{value.firstName ? value.firstName : '-'}</td>
              <td>{value.email}</td>
              <td>{value.phoneNumber ? value.phoneNumber : '-'}</td>
              <td>{value.gender ? value.gender : '-'}</td>
              <td>
                {patientStatus === StatusType.WAITING && (
                  <>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={(e) =>
                        updatePatientStatus(value.id, StatusType.ACTIVE, e)
                      }
                    >
                      Hinzufügen
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={(e) => removePatient(value.id, e)}
                >
                  Entfernen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="d-grid gap-2 mb-3 col-6 mx-auto"
        onClick={() => {
          navigate(`/addNewPatient/${patientStatus}`);
        }}
      >
        <button className="btn btn-primary btn-secondary" type="button">
          Patient hinzufügen
        </button>
      </div>
    </div>
  );
}

export { MyPatients };
