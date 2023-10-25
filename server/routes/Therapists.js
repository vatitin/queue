const express = require('express');
const router = express.Router();
const {Therapist, Patient} = require('../models');
const {validateToken, authTherapistId, isLoggedIn, getIdOfLoggedInTherapist} = require('../middlewares/AuthMiddleware')

router.get("/myPatients", validateToken, isLoggedIn, authTherapistId, getIdOfLoggedInTherapist, async (req, res) => {
  try {
    const therapist = await Therapist.findByPk(req.therapistId);
    const patients = await therapist.getPatients();
    console.log("Patients of therapist with Id:" + req.therapistId)
    //todo status 200 or 201?
    return res.status(200).json(patients);
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