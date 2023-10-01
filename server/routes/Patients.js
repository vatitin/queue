const express = require('express');
const router = express.Router();
const {Patients} = require('../models');

router.get("/", async (req, res) => {
    const patients = await Patients.findAll();
    res.json(patients);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const patient = await Patients.findByPk(id);
    res.json(patient);
})

router.post("/", async (req, res) => {
    const patient = req.body;
    await Patients.create(patient)
    res.json(patient);
})

module.exports = router;