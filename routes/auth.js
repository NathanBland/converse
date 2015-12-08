var express = require('express')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user.js')
var router = module.exports = express.Router()

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
router.use(passport.initialize())
router.use(passport.session())

router.get('/signup', function (req, res) {
  return res.render('signUp', {
    title: 'Create an account - Converse'
  })
})
router.post('/signup', function (req, res, next) {
  if (!req.body.username || !req.body.displayName || !req.body.password || !req.body.age) {
    return res.render('signUp', {
      title: 'Create an account - Converse',
      notification: {
        severity: 'error',
        message: 'Whoops, looks like you left something out, please try again.'
      }
    })
  }
  User.register(new User({
    username: req.body.username
  }), req.body.password, function (err, user, info) {
    console.log('[auth.js] signing up:', user)
    if (err) {
      console.log(err)
      return res.render('signUp', {
        title: 'Converse - Create an account',
        notification: {
          severity: 'error',
          message: 'Failed to register user: ' + err.message
        },
        user: user
      })
    }
    if (!user) {
      console.log('[auth.js] err:', err)
      console.log('[auth.js] user (should be undefined):', user)
      console.log('[auth.js] info:', info)
    }
    console.log('[auth.js] authenticating using local..')
    passport.authenticate('[auth.js] local', {
      successRedirect: '[auth.js] /dashboard',
      failureRedirect: '[auth.js] /signUp',
      failureFlash: true
    })
  })
})
// ----------------------------------------------------
// Don't care about anything below this line currently.
// ----------------------------------------------------
router.get('/login', function (req, res) {
  return res.render('login', {
    title: 'Log in - Converse',
    user: req.user
  })
})

router.post('/login', function (req, res, next) {
  console.log('[auth.js] username:', req.body.username)
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      console.log(err)
      console.log(user)
      return res.render('login', {
        title: 'Log in - Converse',
        notification: {
          severity: 'error',
          message: 'Your username or password is wrong. Try again.'
        }
      })
    }
    // Log the user in and redirect to the homepage.
    req.login(user, function (err) {
      console.log('[auth.js] user logged in after signing up:', user)
      if (err) {
        return next(err)
      }
      return res.redirect('/dashboard')
    })
  })(req, res, next) /**/
})
//
// End local
//
router.get('/logout', function (req, res) {
  req.logout()
  return res.redirect('/')
})
