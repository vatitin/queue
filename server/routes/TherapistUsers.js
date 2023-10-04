const express = require('express');
const router = express.Router();
const {TherapistUser, Therapist} = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 12;

router.post("/", async (req, res) => {
    const {email, password, } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            throw err;
        } else {
            try {
                const therapistUser = await TherapistUser.create({
                    email: email,
                    password: hash
                })
                const therapist = await Therapist.create({
                    TherapistUserId: therapistUser.id,
                })

                await therapistUser.setTherapist(therapist);
                
                res.status(201).json(therapist);

            } catch (error) {
                console.error('Error creating a TherapistUser: ', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    })
});

/*
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
*/

module.exports = router;