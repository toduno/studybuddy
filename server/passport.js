const passport = require('passport');
const User = require('./models/user')

const GoogleStrategy = require('passport-google-oauth20').Strategy

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //done(null, profile)
    User.findOne({googleId: profile.id}).then(userExists => {
        if (userExists) {
            done(null, userExists)
        } else {
            new User({googleId: profile.id})
            .save()
            .then(user => done(null, user))
        }
    })  
  }
));

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})