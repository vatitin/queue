import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function CreatePatient() {

    const initialValues = {
        firstName: '',
        lastName: '',
        email: ''
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Bitte geben Sie einen Vorname ein'),
        lastName: Yup.string().required('Bitte geben Sie einen Nachname ein'),
        email: Yup.string().min(3).max(30).required('Bitte geben Sie eine Email-Adresse ein')
    });

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/patients', data).then(res => {
            navigate('/')
        })
    }

    let navigate = useNavigate();

    return (
        <div className="CreatePatientPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <lavel>Vorname:</lavel>
                    <ErrorMessage name="firstName" component="div" className="error"/>
                    <Field id="inputPatient" name="firstName" placeholder="Max"/>
                    
                    <lavel>Nachname:</lavel>
                    <ErrorMessage name="lastName" component="div" className="error"/>
                    <Field id="inputPatient" name="lastName" placeholder="Mustermann"/>
                    
                    <lavel>Email:</lavel>
                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field id="inputPatient" name="email" placeholder="meine@email.com"/>
                    
                    <button type="submit">Hinzufügen</button>

                </Form>
            </Formik>
        </div>
    );
}

export default CreatePatient;