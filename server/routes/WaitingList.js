const express = require('express');
const router = express.Router();
const {Therapist, Patient, PatientTherapist, Credential} = require('../models');
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

  router.delete("/deletePatient/:patientId", validateToken, isLoggedIn, authTherapistId, getIdOfLoggedInTherapist, async (req, res) => {
    const patientId = req.params.patientId
    const therapistId = req.therapistId

    await PatientTherapist.destroy({where: {
        PatientId: patientId,
        TherapistId: therapistId,
    }})
    await Patient.destroy({where: {id: patientId}})

    res.status(204).json("DELETED PATIENT SUCCESSFULLY")
}) 

router.post("/addNewPatient",  validateToken, isLoggedIn, authTherapistId, getIdOfLoggedInTherapist, async (req, res) => {
    const therapistId = req.therapistId;
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