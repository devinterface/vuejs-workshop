import passport from 'passport'
import User from '../models/User'

var LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    done(null, user)
  })
})

// Sign in with Email and Password
passport.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  User.findOne({ where: {email: email} })
    .then(function (user) {
      if (!user) {
        return done(null, false, { msg: 'The email address ' + email + ' is not associated with any account. ' +
        'Double-check your email address and try again.' })
      }
      const isMatch = user.authenticate(password)
      if (!isMatch) {
        return done(null, false, { msg: 'Invalid email or password' })
      }
      return done(null, user)
    })
})
)
