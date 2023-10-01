import React, {useEffect, useState} from 'react';
import {useParams} from'react-router-dom';
import axios from 'axios';

function Patient() {
    let {id} = useParams();
    const [patientObject, setPatientObject] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/patients/byId/${id}`)
        .then((response) => {
            setPatientObject(response.data);
        })
    });

    return (
        <div>
        <div>{patientObject.id}</div>
        <div>{patientObject.lastName ? patientObject.lastName : "-"}</div>
        <div>{patientObject.firstName ? patientObject.firstName : "-"}</div>
        <div>{patientObject.email}</div>
        </div>
    );
}

export { Patient };