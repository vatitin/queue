const express = require('express');
const router = express.Router();
const {Patient} = require('../models');

router.get("/", async (req, res) => {
    const patients = await Patient.findAll();
    res.json(patients);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const patient = await Patient.findByPk(id);
    res.json(patient);
})

router.post("/", async (req, res) => {
    const patient = req.body;
    await Patient.create(patient)
    res.json(patient);
})

module.exports = router;