import React, { useEffect, useContext } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext"

function CreatePatient() {
    const {patientStatus} = useParams();
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    const config = {
        headers: {
          "Content-Type": "application/json"
          },
          withCredentials: true
        }

    const initialValues = {
        firstName: '',
        lastName: '',
        email: ''
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Bitte geben Sie einen Vorname ein'),
        lastName: Yup.string().required('Bitte geben Sie einen Nachname ein'),
        email: Yup.string()
        .email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
        .required('Bitte geben Sie eine E-Mail-Adresse ein')    });

    const onSubmit = async (data) => {
        await axios.post(`http://localhost:3001/therapist/patients/addNewPatient/${patientStatus}`, data, config)
        navigate(`/myPatients/${patientStatus}`)
    }

    useEffect(() => {
        if (!authState.status) {
          return navigate("/loginTherapist")
        }
    }, [authState.status, navigate]);

    return (
        <div className="CreatePatientPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Vorname:</label>
                    <ErrorMessage name="firstName" component="div" className="error"/>
                    <Field id="inputPatient" name="firstName" placeholder="Max"/>
                    
                    <label>Nachname:</label>
                    <ErrorMessage name="lastName" component="div" className="error"/>
                    <Field id="inputPatient" name="lastName" placeholder="Mustermann"/>
                    
                    <label>Email:</label>
                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field id="inputPatient" name="email" placeholder="meine@email.com"/>
                    
                    <button type="submit">Hinzufügen</button>

                </Form>
            </Formik>
        </div>
    );
}

export default CreatePatient;