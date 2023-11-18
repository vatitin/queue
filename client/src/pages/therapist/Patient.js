import React, {useEffect, useState} from 'react';
import {useParams} from'react-router-dom';
import { patientById } from "../../endpoints"
import axios from 'axios';

function Patient() {
    const {id} = useParams();
    const [patientObject, setPatientObject] = useState([]);

    useEffect(() => {
        const response = async () => {
            return await axios.get(patientById(id))
        }
        setPatientObject(response.data);
    }, [id]);

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