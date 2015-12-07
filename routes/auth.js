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

router.use(function (req, res, next) {
  // console.log('[req]:', req)
  var user = req.user
  console.log('user:', req.user)
  if (user) {
    res.locals.user = {
      username: user.username
    }
  }
  next()
})

router.get('/login', function (req, res, next) {
  return res.render('login', {
    title: 'Log In',
    user: req.user
  })
})

router.get('/signUp', function (req, res, next) {
  return res.render('signUp', {
    title: 'Sign Up',
    user: req.user
  })
})
router.get('logout', function (req, res) {
  req.logout()
  return res.redirect('/')
})

router.post('/login', function (req, res, next) {
  console.log(req.body.email + ' logged in')
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log(err)
    }
    if (!user) {
      return res.render('login', {
        title: 'Log in',
        notification: {
          severity: 'error',
          message: 'Your username or password was incorrect, please try again.'
        }
      })
    }
    req.login(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.redirect('/dashboard')
    })
  })(req, res, next)
})

router.post('/signUp', function (req, res, next) {
  if (!req.body.password || !req.body.email || !req.body.username || !req.body.age) {
    return res.render('signUp', {
      title: 'Converse - Sign Up',
      notification: {
        severity: 'error',
        message: 'Sorry about that, looks like you missed some required details! Please try again.'
      }
    })
  }
  console.log('user details:', req.body)
  console.log(req.body.email + ' signed up')
  User.register(new User({
    email: req.body.email, username: req.body.username
  }), req.body.password, function (err, user) {
    if (err) {
      console.log('Error during sign up:', err)
      return res.render('signUp', {
        title: 'Converse - Sign Up',
        notification: {
          severity: 'error',
          message: 'Failed to register user: ' + err.message
        },
        user: user
      })
    }
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        console.log(err)
      }
      if (!user) {
        console.log('user doesn\'t exist somehow?', info)
        return res.render('signUp', {
          title: 'Converse - Sign Up',
          notification: {
            severity: 'error',
            message: 'Your username or password was incorrect, please try again.'
          }
        })
      }
      req.login(user, function (err) {
        if (err) {
          return next(err)
        }
        return res.redirect('/dashboard')
      })
    })(req, res, next)
  })
})
