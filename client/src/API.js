import axios from 'axios';
import { deletePatientWithId, patientsWithStatus, updatePatient } from './endpoints';

export const fetchPatientsWithStatus = (patientStatus, config) =>
  axios.get(patientsWithStatus(patientStatus), config);

export const deletePatient = (id, config) =>
  axios.delete(deletePatientWithId(id), config);

export const patchPatientStatus = (id, status, config) =>
  axios.patch(updatePatient(id, status), config);