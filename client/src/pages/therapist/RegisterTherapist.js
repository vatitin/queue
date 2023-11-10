import { React } from "react";
import { useNavigate } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function RegisterTherapist() {

    const navigate = useNavigate();

    const config = {
        headers: {
          "Content-Type": "application/json"
          },
          withCredentials: true
        }

    const initialValues = {
        email: '',
        password: '',
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
        .required('Bitte geben Sie eine E-Mail-Adresse ein'),
        password: Yup.string()
        .required('Bitte geben Sie ein Passwort ein.')
        .min(8, 'Passwort zu kurz - muss mindestend 8 Zeichen enthalten.')
        .max(30, 'Passwort zu lang - darf mindestens 30 Zeichen enthalten.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: 'Passwort muss mindestens einen Großbuchstaben, Kleinbuchstaben, eine Zahl und Sonderzeichen enthalten.',
            excludeEmptyString: true,
        })
    });

    const onSubmit = (data) => {
        axios.post(`http://localhost:3001/therapistAuth/register`, data, config).then(() => {
            return navigate('/loginTherapist')
        })
    }
    
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
                    
                    <label>Passwort:</label>
                    <ErrorMessage name="password" component="div" className="error"/>
                    <Field id="inputPatient" name="password" type="password"/>
                    
                    <button type="submit">Registrieren</button>

                </Form>
            </Formik>
        </div>
    );

}

export {RegisterTherapist};