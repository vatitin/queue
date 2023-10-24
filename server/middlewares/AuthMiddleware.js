const {sign, verify} = require('jsonwebtoken');
require('dotenv').config();
const {Credential, TherapistRoles} = require('../models');

const secretPassword = process.env.SECRET_PASSWORD;


const authTherapistId = async (req, res, next) => {
  try {
    const therapist = await Therapist.findByPk(req.therapistId);

    if (!therapist) {
      return res.status(400).json({ error: 'Therapeut existiert nicht!' });
    }
    next();
  } catch (error) {
    console.error('Error finding therapist:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const createTokens = (user) => {
    const accessToken = sign({email: user.email, id: user.id}, secretPassword);
    return accessToken;
}

//todo maybe in another file like helper
const isLoggedIn = async (req, res, next) => {
  //todo check what happens if therapist and patient use the same email
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(403).json({isLoggedIn: false, error: "Nutzer ist nicht eingeloggt"});

  try {
      const decodedToken = verify(accessToken, secretPassword)
      if (!decodedToken) return res.send({isLoggedIn: false});
      //todo is this necessary? Maybe remove
      req.credentialId = decodedToken.id;

      req.authenticated = true;
      const therapistCredential = await Credential.findByPk(decodedToken.id)
      const therapist = await Therapist.findByPk(therapistCredential.therapistId)
      req.therapistId = therapist.id;
      res.send({isLoggedIn: true});
      next;

  } catch(err) {
      console.error("Error validating token:", err);
      return res.status(500).json({error: "Ein unerwarteter Fehler ist aufgetreten!"})
  }
}

const validateToken = (req, res, next) => {
  //todo check what happens if therapist and patient use the same email
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(400).json({error: "Benutzer ist nicht eingeloggt!"})

    try {
        const decodedToken = verify(accessToken, secretPassword)
        if (!decodedToken) return res.status(400).json({error: "Authentifizierung fehlgeschlagen!"})
        
        req.credentialId = decodedToken.id;
        req.authenticated = true;
        return next();
    } catch(err) {
        console.error("Error validating token:", err);
        return res.status(500).json({error: "Ein unerwarteter Fehler ist aufgetreten!"})
    }
}

module.exports = {createTokens, validateToken, authTherapistId, isLoggedIn}