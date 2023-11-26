require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {Credential, Therapist} = require('./models');
const secretKey = process.env.SECRET_KEY;

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies.accessToken) {
      token = req.cookies.accessToken;
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      console.log('JWT Strategy Executing...');
      const credential = await Credential.findByPk(jwtPayload.id);
      if (credential) {
        return done(null, credential);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
