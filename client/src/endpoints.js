const BASE_URL = 'http://localhost:3001';
const THERAPIST_PATIENTS_URL = `${BASE_URL}/therapist/patients`;
const THERAPIST_URL = `${BASE_URL}/therapist`;

export const therapistProfile = `${BASE_URL}/therapist/myProfile`;

export const patientById = (id) => `${THERAPIST_PATIENTS_URL}/byId/${id}`;

export const patientsWithStatus = (status) =>
  `${THERAPIST_PATIENTS_URL}/${status}`;

export const deletePatientWithId = (id) =>
  `${THERAPIST_URL}/removePatient/${id}`;

export const updatePatient = (id, status) =>
  `${THERAPIST_URL}/updatePatient/${id}/${status}`;

export const addPatientWithStatus = (status) =>
  `${THERAPIST_URL}/createPatient/${status}`;
