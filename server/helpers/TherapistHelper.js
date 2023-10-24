
const getIdOfLoggedInUser = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(403).json({isLoggedIn: false, error: "Nutzer ist nicht eingeloggt"});
  
    try {
        const decodedToken = verify(accessToken, secret)
        if (!decodedToken) return res.send({isLoggedIn: false});
        //todo is this necessary? Maybe remove
        req.credentialId = decodedToken.id;
  
        req.authenticated = true;
        const therapistCredential = await Credential.findByPk(decodedToken.id)
        const therapist = await Therapist.findByPk(therapistCredential.therapistId)
        req.therapistId = therapist.id;
    } catch (err) {
        
    }
}