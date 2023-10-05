import { React, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function LoginTherapist() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        const data = {
            email: email,
            password: password
        }
        axios.post(`http://localhost:3001/therapistAuth/login`, data).then((response) => {
            console.log(response.data);
        })
    }

    return (
        <div>
            <input type="text" 
            onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <input type="password" 
            onChange={(event) => {
                setPassword(event.target.value);
            }}/>

            <button onClick={login}>Login</button>
        </div>
    )
    /*
    return (
        <div className="CreatePatientPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Email:</label>
                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field id="inputPatient" name="email" placeholder="meine@email.com"/>
                    
                    <label>Passwort:</label>
                    <ErrorMessage name="password" component="div" className="error"/>
                    <Field id="inputPatient" name="password"/>
                    
                    <button type="submit">Login</button>

                </Form>
            </Formik>
        </div>
    );
    */
}

export {LoginTherapist};