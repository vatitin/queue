const express = require('express');
const router = express.Router();
const {Therapist, Credential} = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const { sign, verify } = require('jsonwebtoken')
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
//todo implement CSRF protenction and handle XSS attacks (look up if necessary with cookies as storage)
 
router.post("/register", async (req, res) => {
    const {email, password, firstName, lastName, gender, address} = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(400).json({error: "Benutzer konnte nicht registriert werden!"});
        } else {
            try {
                const existsCredential = await Credential.findOne({
                    where: {
                    email: req.body.email,
                    }
                })
                if (existsCredential) return res.status(409).json({ 
                    error: 'Email already registered', 
                    message: 'The email address provided is already associated with an existing account.' 
                });
                
                const therapist = await Therapist.create({                    
                    firstName,
                    lastName,
                    gender,
                    address})
                const credential = await Credential.create({
                    email,
                    password: hash,
                })
                therapist.setCredential(credential);

                return res.status(201).json(therapist);

            } catch (error) {
                console.error('Error creating a TherapistUser: ', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    })
});

router.get("/login", async (req, res) => {
    const token = req.cookies.accessToken;
    if (token) {
        const decodedToken = verify(token, secretKey)

        therapistCredential = await Credential.findByPk(decodedToken.id)
        //todo check if user in res is necessary
        return res.send({loggedIn: true, email: therapistCredential.email, id: therapistCredential.id})
    } else {
        return res.send({loggedIn: false, user: null})
    }
})

router.get("/logout", async (req, res) => {
    res.clearCookie("accessToken");
    res.send({LoggedIn: false})
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await Credential.findOne({where: {email: email}})

    if (!user) return res.status(401).json({ error: 'Der Nutzer existiert nicht' });

    bcrypt.compare(password, user.password).then(match => {
        if (!match) return res.status(401).json({ error: 'Nutzername oder Passwort ist falsch' });

        const accessToken = sign({email: user.email, id: user.id}, secretKey)
        res.cookie('accessToken', accessToken, {maxAge: 900000, httpOnly: true,});
        //todo check if this is neccesary compared to above
        //res.cookie('accessToken', accessToken, {maxAge: 900000, httpOnly: true, secure: true});
        
        const email = user.email
        const id = user.TherapistId
        const status = true
        return res.status(200).json({id, email, status});
    })
})

module.exports = router;