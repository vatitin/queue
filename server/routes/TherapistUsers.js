const express = require('express');
const router = express.Router();
const {TherapistUser, Therapist, TherapistsCredential, Role} = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const {createTokens} = require('../middlewares/AuthMiddleware')
//todo implement CSRF protenction and handle XSS attacks
 
router.post("/register", async (req, res) => {
    const {email, password, } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(400).json({error: err});
        } else {
            try {
                const therapist = await Therapist.create()
                const credential = await TherapistsCredential.create({
                    email: email,
                    password: hash
                })
                await therapist.setTherapistsCredential(credential);

                const role = await Role.findOne({where: {name: "therapist"}});
                await role.addTherapist(therapist);

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
    const user = await TherapistsCredential.findOne({where: {email: email}})

    if (!user) return res.status(400).json({ error: 'Der Nutzer existiert nicht' });

    bcrypt.compare(password, user.password).then(match => {
        if (!match) return res.status(400).json({ error: 'Nutzername oder Passwort ist falsch' });

        const accessToken = createTokens(user);

        res.cookie('accessToken', accessToken, {maxAge: 900000, httpOnly: true});
        //todo check if this is neccesary compared to above
        //res.cookie('accessToken', accessToken, {maxAge: 900000, httpOnly: true, secure: true});

        return res.status(200).json("authenticated");
    })
})

module.exports = router;