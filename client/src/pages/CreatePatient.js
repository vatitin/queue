import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


function CreatePatient() {

    let {therapistId} = useParams();
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

    const onSubmit = (data) => {
        axios.post(`http://localhost:3001/therapists/addNewPatient/${therapistId}`, data, config).then(res => {
            navigate('/')
        })
    }

    let navigate = useNavigate();

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