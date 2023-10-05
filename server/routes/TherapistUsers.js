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

                return res.status(201).json(therapist);

            } catch (error) {
                console.error('Error creating a TherapistUser: ', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    })
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await TherapistUser.findOne({where: {email: email}})

    if (!user) return res.json({ error: 'Der Nutzer existiert nicht' });

    bcrypt.compare(password, user.password).then(match => {
        if (!match) return res.json({ error: 'Nutzername oder Passwort ist falsch' });
        
        return res.json("U LOGGED IN! HURRAY")
    })
})

module.exports = router;