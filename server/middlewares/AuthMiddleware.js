const {sign, verify} = require('jsonwebtoken');
//todo change secret value, when push to git, create an .env file
const secret = "importantSecret";
const {Credential, TherapistRoles} = require('../models');

const authTherapistId = async (req, res, next) => {
  try {
        const decodedId = req.credentialId;
        const therapistId = await Credential.findOne({ where: { TherapistId: decodedId } });
        if (!therapistId) {
          return res.status(400).json({ error: 'Therapeut existiert nicht!' });
        }
        if (therapistId.id !== parseInt(req.params.therapistId)) {
          return res.status(401).json({ error: 'Benutzer hat keine Berechtigung!' });
        }
        next();
      } catch (error) {
        console.error('Error finding therapist:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

const createTokens = (user) => {
    const accessToken = sign({email: user.email, id: user.id}, secret);
    return accessToken;
}

const validateToken = (req, res, next) => {
  //todo check what happens if therapist and patient use the same email
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(400).json({error: "Benutzer ist nicht eingeloggt!"})

    try {
        const decodedToken = verify(accessToken, secret)
        if (!decodedToken) return res.status(400).json({error: "Authentifizierung fehlgeschlagen!"})
        
        req.credentialId = decodedToken.id;
        req.authenticated = true;
        return next();
    } catch(err) {
        console.error("Error validating token:", err);
        return res.status(500).json({error: "Ein unerwarteter Fehler ist aufgetreten!"})
    }
}

module.exports = {createTokens, validateToken, authTherapistId}