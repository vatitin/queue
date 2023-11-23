import React, {useEffect, useState} from 'react';
import {useParams} from'react-router-dom';
import { patientById } from "../../endpoints"
import axios from 'axios';

function Patient() {
    const {id} = useParams();
    const [patientObject, setPatientObject] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
          
        axios.get(patientById(id), config).then((response) => {
            setPatientObject(response.data);
        })

    }, [id]);

    return (
        <div>
            <div>{patientObject.lastName ? patientObject.lastName : "-"}</div>
            <div>{patientObject.firstName ? patientObject.firstName : "-"}</div>
            <div>{patientObject.email}</div>
            <div>{patientObject.phoneNumber ? patientObject.phoneNumber : "-"}</div>
            <div>{patientObject.gender}</div>
        </div>
    );
}

export { Patient };