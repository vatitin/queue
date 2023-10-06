const {sign, verify} = require('jsonwebtoken');
//todo change secret value, when push to git, create an .env file
const secret = "importantSecret";

const createTokens = (user) => {
    const accessToken = sign({email: user.email, id: user.id}, secret);
    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(400).json({error: "Benutzer ist nicht eingeloggt!"})

    try {
        const validToken = verify(accessToken, secret)
        if (!validToken) return res.status(400).json({error: "Authentifizierung fehlgeschlagen!"})
        
        req.authenticated = true;
        return next();
    } catch(err) {
        console.error("Error validating token:", err);
        return res.status(500).json({error: "Ein unerwarteter Fehler ist aufgetreten!"})
    }
}

module.exports = {createTokens, validateToken}