const express = require('express');
const router = express.Router();
const {Therapist, PatientTherapist, Patient} = require('../models');

router.get("/byTherapistId/:therapistId", async (req, res) => {
    const id = req.params.therapistId;
    const therapist = await Therapist.findByPk(id);
    const patients = await therapist.getPatients();
    res.json(patients);
})

router.post("/", async (req, res) => {
    const therapist = req.body;
    await Therapist.create(therapist)
    res.json(therapist);
})

router.post("/addNewPatient/:therapistId", async (req, res) => {
    const { therapistId } = req.params;
    const patientData = req.body;
  
    try {
      const therapist = await Therapist.findByPk(therapistId);
      const patient = await Patient.create(patientData)
      const numberOfPatients = await therapist.countPatients();

      therapist.addPatient(patient, {through: {subscriptionInWaitingList: numberOfPatients}});
  
      res.json(patient);
    } catch (error) {
      console.error('Error adding new patient:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;