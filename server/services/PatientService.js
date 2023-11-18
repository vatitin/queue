const express = require('express');
const {PatientTherapist, Patient} = require('../models');

const getPatients = async (therapistId, patientStatus) => {
    const therapistPatients = await PatientTherapist.findAll({
        where: {
            TherapistId: therapistId,
            status: patientStatus
        },
    });

    const patientIds = therapistPatients.map(therapistPatient => therapistPatient.PatientId);

    const patients = await Patient.findAll({
        where: {
            id: patientIds
        }
    });

    return patients
}

module.exports = { getPatients } 