const express = require('express');
const router = express.Router();
const {Therapist, Patient} = require('../models');
const {validateToken, authTherapistId} = require('../middlewares/AuthMiddleware')

router.get("/getPatients/:therapistId", validateToken, authTherapistId, async (req, res) => {
  try {
    const id = req.params.therapistId;
    const therapist = await Therapist.findByPk(id);
    const patients = await therapist.getPatients();
    res.json(patients);
  }
  catch (error) {
    console.error('Error finding the Therapist or Patients of the Therapist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post("/addNewPatient/:therapistId", validateToken, authTherapistId, async (req, res) => {
    const { therapistId } = req.params;
    const patientData = req.body;
  
    try {
      const therapist = await Therapist.findByPk(therapistId);
      const numberOfPatients = await therapist.countPatients();

      const patient = await Patient.create(patientData)

      therapist.addPatient(patient, {through: {subscriptionInWaitingList: numberOfPatients}});
  
      res.json(patient);
    } catch (error) {
      console.error('Error adding new patient:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;