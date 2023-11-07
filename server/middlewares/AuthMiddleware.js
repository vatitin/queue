require('dotenv').config();
const {sign, verify} = require('jsonwebtoken');
const {getDecodedToken} = require('../helpers/TherapistHelper');
const {Credential, Therapist} = require('../models');

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

const getIdOfLoggedInTherapist = async (req, res, next) => {
  try {
      const decodedToken = getDecodedToken(req)
      if (!decodedToken) return res.status(403).json({isLoggedIn: false, error: "Nutzer ist nicht eingeloggt"});
      const therapistCredential = await Credential.findByPk(decodedToken.id)

      next();
  } catch (err) {
      console.log("getIdOfLoggedInTherapist threw an error!", err)
      return res.status(500).json({error: "Ein unerwarteter Fehler ist aufgetreten."});
  }
}

const isLoggedIn = async (req, res, next) => {
  try {
      const decodedToken = getDecodedToken(req)
      if (!decodedToken) return res.status(403).json({isLoggedIn: false, error: "Nutzer ist nicht eingeloggt"});
      const therapistCredential = await Credential.findByPk(decodedToken.id);
      if (!therapistCredential) return res.status(403).json({isLoggedIn: false, error: "Nutzer konnte nicht gefunden werden."});

      req.therapistCredentialId = decodedToken.id
      req.therapistId = await therapistCredential.TherapistId
      res.isLoggedIn = true;
      next();

  } catch(err) {
      console.error("Error validating token:", err);
      return res.status(500).json({error: "Ein unerwarteter Fehler ist aufgetreten!"})
  }
}
//todo check if that can be removed and isLoggedIn be used instead
const validateToken = (req, res, next) => {
  //todo check what happens if therapist and patient use the same email
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) return res.status(401).json({error: "Benutzer ist nicht eingeloggt!"})
        const decodedToken = verify(accessToken, secretPassword)
        if (!decodedToken) return res.status(401
          ).json({error: "Authentifizierung fehlgeschlagen!"})
        
        req.authenticated = true;
        next();
    } catch(err) {
        console.error("Error validating token:", err);
        return res.status(500).json({error: "Ein unerwarteter Fehler ist aufgetreten!"})
    }
}

module.exports = {createTokens, validateToken, authTherapistId, isLoggedIn, getIdOfLoggedInTherapist}