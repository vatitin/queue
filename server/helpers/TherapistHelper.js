const {verify} = require('jsonwebtoken');
require('dotenv').config();
const secretPassword = process.env.SECRET_PASSWORD;

const getDecodedToken = (req) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) return null
          
        const decodedToken = verify(accessToken, secretPassword)
        return decodedToken
    } catch (err) {
        console.log("error at decoding cookie token:" + err.message)        
        throw new error("Ein unerwarteter Fehler ist aufgetreten!")
    }
}

module.exports = {getDecodedToken}