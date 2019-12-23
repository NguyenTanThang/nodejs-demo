var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../model/user");

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: "936531992148-rlin00ko2q0kijsme4erf3961jikgedu.apps.googleusercontent.com",
    clientSecret: "blOwfpVn8Q9QPSTXz_A4YbIh",
    callbackURL: "https://nodejs-blog-backend.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
));