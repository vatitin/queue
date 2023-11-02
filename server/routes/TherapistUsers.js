const express = require('express');
const router = express.Router();
const {Therapist, Credential, Role} = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const {createTokens, isLoggedIn} = require('../middlewares/AuthMiddleware')
//todo implement CSRF protenction and handle XSS attacks (look up if necessary with cookies as storage)
 
router.post("/register", async (req, res) => {
    const {email, password, } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(400).json({error: "Benutzer konnte nicht registriert werden!"});
        } else {
            try {
                const therapist = await Therapist.create()
                const credential = await Credential.create({
                    email: email,
                    password: hash,
                })
                therapist.setCredential(credential);
                const role = await Role.create({name: "Therapist"});
                await therapist.addRole(role)

                return res.status(201).json(therapist);

            } catch (error) {
                console.error('Error creating a TherapistUser: ', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    })
});

router.get("/login", isLoggedIn, async (req, res) => {
    if (req.cookies.accessToken) {
        return res.send({loggedIn: true, user: req.cookies.user})
    } else {
        return res.send({loggedIn: false, user: null})
    }
})

router.get("/logout", async (req, res) => {
    console.log("logout ---------------------------")
    res.clearCookie("accessToken");
    res.send({LoggedIn: false})
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await Credential.findOne({where: {email: email}})

    if (!user) return res.status(401).json({ error: 'Der Nutzer existiert nicht' });

    bcrypt.compare(password, user.password).then(match => {
        if (!match) return res.status(401).json({ error: 'Nutzername oder Passwort ist falsch' });

        const accessToken = createTokens(user);
        res.cookie('accessToken', accessToken, {maxAge: 900000, httpOnly: true,});
        //todo check if this is neccesary compared to above
        //res.cookie('accessToken', accessToken, {maxAge: 900000, httpOnly: true, secure: true});

        const therapistId = user.TherapistId
        responseObject = {therapistId};
        return res.status(200).json(responseObject);
    })
})

module.exports = router;