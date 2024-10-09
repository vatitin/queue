const BASE_URL = 'http://localhost:3001';
const THERAPIST_PATIENTS_URL = `${BASE_URL}/therapist/patients`

export const therapistProfile = `${BASE_URL}/therapist/myProfile`

export const patientById = (id) => `${THERAPIST_PATIENTS_URL}/byId/${id}`
export const patientsWithStatus = (status) => `${THERAPIST_PATIENTS_URL}/${status}` 
export const deletePatientWithId = (id) => `${THERAPIST_PATIENTS_URL}/deletePatient/${id}`
export const updatePatient = (id, status) => `${BASE_URL}/therapist/updatePatient/${id}/${status}`
export const addPatientWithStatus = (status) => `${BASE_URL}/therapist/createPatient/${status}`