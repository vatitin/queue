const express = require('express');
const router = express.Router();
const { getPatients } = require('../services/PatientService')
const { Therapist, Patient, PatientTherapist } = require('../models');
const passport = require('passport');

//todo check for all patients that they are patients of the therapist requestng it
router.get("/byId/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params.id
  const patient = await Patient.findByPk(id)
  res.json(patient)
})

router.get("/:status", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const patientStatus = req.params.status
  const therapistId = req.user.TherapistId;

  try {
  const patients = await getPatients(therapistId, patientStatus)
      console.log("Patients of therapist with Id:" + therapistId)
      //todo status 200 or 201?
      return res.status(200).json(patients);
    }
    catch (error) {
      console.error('Error finding the Therapist or Patients of the Therapist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  router.delete("/deletePatient/:patientId", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const patientId = req.params.patientId
    const therapistId = req.user.TherapistId;


    await PatientTherapist.destroy({where: {
        PatientId: patientId,
        TherapistId: therapistId,
    }})
    await Patient.destroy({where: {id: patientId}})

    res.status(204).json("DELETED PATIENT SUCCESSFULLY")
  }) 

router.post("/addNewPatient/:status", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const therapistId = req.user.TherapistId;
    const patientData = req.body;
    const patientStatus = req.params.status

    try {
      const therapist = await Therapist.findByPk(therapistId);
      const patients = await getPatients(therapistId, patientStatus)

      const numberOfPatients = patients.length

      const patient = await Patient.create(patientData)

      therapist.addPatient(patient, {
        through: {
          subscriptionInWaitingList: numberOfPatients,
          status: patientStatus
        },
      });

      res.json(patient);
    } catch (error) {
      console.error('Error adding new patient:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;