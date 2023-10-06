const express = require('express');
const router = express.Router();
const {Therapist, PatientTherapist, Patient} = require('../models');
const {validateToken} = require('../middlewares/AuthMiddleware')

router.get("/byId/:therapistId", async (req, res) => {
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

router.get("/myProfile", validateToken, async (req, res) =>  {
  res.json("profile");
})

router.post("/", async (req, res) => {
    const therapist = req.body;
    await Therapist.create(therapist)
    res.json(therapist);
})

router.post("/addNewPatient/:therapistId", validateToken, async (req, res) => {
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