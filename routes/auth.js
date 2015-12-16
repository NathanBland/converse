var express = require('express')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')

var router = module.exports = express.Router()

// Start session and set locals.
router.use(passport.initialize())
router.use(passport.session())
router.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user
  }
  next()
})
router.use(function (req, res, next) { // grab notifications
  if (req.user) {
    req.user.findNotifications(function (err, notifications) {
      if (err) {
        console.warn('[auth.js] err getting notifications:', err)

        next(err)
      }
      console.warn('[auth.js] notifications:', notifications)
      res.locals.notifications = notifications
      next()
    })
  } else {
    next()
  }
})
router.use(function (req, res, next) { // grab friends
  if (req.user) {
    req.user.findFriends(function (err, friends) {
      if (err) {
        console.warn('[auth.js] err getting friends:', err)
        next(err)
      }
      res.locals.friends = friends
      next()
    })
  } else {
    next()
  }
})
// setup our routes.
router.get('/signup', signup)
router.get('/login', login)
router.get('/logout', logout)

router.post('/login', authenticate)
router.post('/signup', register)

// Start the Strategy
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

// route functions
function signup (req, res, next) {
  res.render('signup', {
    title: 'Signup'
  })
}

function login (req, res, next) {
  if (req.user) {
    return res.redirect('/dashboard')
  }
  res.render('login', {
    title: 'Login'
  })
}

function authenticate (req, res, next) {
  console.log(req.body.username)
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log('[auth.js] err: ' + err)
      return next(err)
    }

    if (!user) {
      console.log('[auth.js] err: ' + err)
      console.log('[auth.js] user: ' + user)
      return res.render('login', {
        title: 'Converse - Log in',
        notification: {
          severity: 'error',
          message: 'Your username or password is wrong. Try again.'
        }
      })
    }
    // Log the user in and redirect to their dashboard.
    req.login(user, function (err) {
      if (err) {
        return next(err)
      }
      res.locals.user = user
      // console.log('[auth.js] user in auth:' + user);
      var redirect = '/dashboard'
      if (req.cookies.redirect) {
        redirect = req.cookies.redirect
        res.cookie('redirect', null, {maxAge: 0, expires: Date.now()})
      }
      return res.redirect(redirect)
    })
  })(req, res, next)
}

function register (req, res, next) {
  if (!req.body.username || !req.body.displayName || !req.body.password || !req.body.age) {
    return res.render('signup', {
      title: 'Converse - Create an account',
      notification: {
        severity: 'error',
        message: 'Looks like you missed a few details, try again please.'
      }
    })
  } else {
    User.register(new User({
      email: req.body.username, displayName: req.body.displayName
    }), req.body.password, function (err, user) {
      if (err) {
        console.error('[auth.js] Failed to add user: ' + req.body.username + ' Error: ' + err)
        return res.render('signup', {
          title: 'Converse - Create an account',
          notification: {
            severity: 'error',
            message: 'Failed to register user: ' + err.message
          },
          user: user
        })
      }
      console.log(user)
      passport.authenticate('local')(req, res, function () {
        return res.redirect('/dashboard')
      })
    })
  }
}

function logout (req, res, next) {
  req.logout()
  res.redirect('/')
}
