const express = require('express');
const {PatientTherapist, Patient, Therapist} = require('../models');

const getPatients = async (therapistId, patientStatus) => {
    try {
        const therapist = await Therapist.findByPk(therapistId, {
            include: [
                {
                    model: Patient,
                    as: 'Patients',
                    through: {
                        model: PatientTherapist,
                        where: {
                            status: patientStatus
                        },
                        attributes: ['sequence', 'status']
                    }
                }
            ]
        });

        if (!therapist) {
            throw new Error('Therapist not found.');
        }

        therapist.Patients.forEach((patient) => {
            console.log(JSON.stringify(patient, null, 2));
        })
        
        return therapist.Patients;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};

module.exports = { getPatients } 