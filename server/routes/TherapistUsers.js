const express = require('express');
const router = express.Router();
const {TherapistUser, Therapist} = require('../models');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const saltRounds = 12;
const {sign} = require('jsonwebtoken');
const {createTokens} = require('../middlewares/AuthMiddleware')
//todo implement CSRF protenction and handle XSS attacks
 
router.post("/register", async (req, res) => {
    const {email, password, } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(400).json({error: err});
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