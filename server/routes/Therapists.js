const express = require('express');
const router = express.Router();
const {Therapist, Patient, PatientTherapist, Credential} = require('../models');
const {validateToken, authTherapistId, isLoggedIn, getIdOfLoggedInTherapist} = require('../middlewares/AuthMiddleware')

router.get("/myProfile", validateToken, isLoggedIn, authTherapistId, getIdOfLoggedInTherapist, async (req, res) => {
  try {
    const therapistCredential = await Credential.findByPk(req.therapistCredentialId);
    const therapist = await Therapist.findByPk(therapistCredential.TherapistId)
    const response = {
      email: therapistCredential.email, 
      firstName: therapist.firstName, 
      lastName:therapist.lastName, 
      gender: therapist.gender, 
      address: therapist.address, 
    }

    return res.status(200).json(response);
  }
  catch (error) {
    console.error('Error finding the Therapist or Patients of the Therapist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;