import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { patientById } from '../../endpoints';
import apiClient from '../../services/APIService';

function Patient() {
  const { id } = useParams();
  const [patientObject, setPatientObject] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await apiClient.get(patientById(id))
      setPatientObject(response.data) 
    }

    fetchPatients();
  }, [id]);

  return (
    <div>
      <div>{patientObject.lastName ? patientObject.lastName : '-'}</div>
      <div>{patientObject.firstName ? patientObject.firstName : '-'}</div>
      <div>{patientObject.email}</div>
      <div>{patientObject.phoneNumber ? patientObject.phoneNumber : '-'}</div>
      <div>{patientObject.gender}</div>
    </div>
  );
}

export { Patient };
