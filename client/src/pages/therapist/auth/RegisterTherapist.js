import { React } from "react";
import { useNavigate } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSignup } from "../../../hooks/useSignup"

function RegisterTherapist() {

    const { signup, error } = useSignup();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
        firstName: "",
        lastName: "",
        gender: "",
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
        signup(data)
        if (!error) {
            navigate('/loginTherapist')
        }
    }
    
    return (
        <div className="container">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Vorname</label>
                        <ErrorMessage name="firstName" component="div" className="error"/>
                        <Field className="form-control" id="firstName" name="firstName" placeholder="Max"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Nachname</label>
                        <ErrorMessage name="lastName" component="div" className="error"/>
                        <Field className="form-control" id="lastName" name="lastName" placeholder="Mustermann"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <ErrorMessage name="email" component="div" className="error"/>
                        <Field className="form-control" id="email" name="email" placeholder="max.mustermann@gmail.com"/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <ErrorMessage name="password" component="div" className="error"/>
                        <Field type="password" className="form-control" id="password" name="password"/>
                    </div>

                    <button type="submit">Registrieren</button>

                </Form>
            </Formik>
        </div>
    );

}

export {RegisterTherapist};