const JwtStrategy = require('passport-jwt').Strategy,
       ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/newuser');
const config = require('../config/database');

// https://www.npmjs.com/package/passport-jwt

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.mongo.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      User.getUserById(jwt_payload.data._id, (err, user) => {
        if(err) {
          return done(err, false);
        }
  
        if(user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }));
  }
