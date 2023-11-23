const BASE_URL = 'http://localhost:3001';
const THERAPIST_PATIENTS_URL = `${BASE_URL}/therapist/patients`

export const therapistProfile = `${BASE_URL}/therapist/myProfile`

export const registerTherapist = `${BASE_URL}/therapistAuth/register`
export const logoutTherapist = `${BASE_URL}/therapistAuth/logout`
export const loginTherapist = `${BASE_URL}/therapistAuth/login`

export const patientById = (id) => `${THERAPIST_PATIENTS_URL}/byId/${id}`
export const patientsWithStatus = (status) => `${THERAPIST_PATIENTS_URL}/${status}` 
export const deletePatientWithId = (id) => `${THERAPIST_PATIENTS_URL}/deletePatient/${id}`
export const addPatientWithStatus = (status) => `${THERAPIST_PATIENTS_URL}/addNewPatient/${status}`