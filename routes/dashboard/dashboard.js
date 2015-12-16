var express = require('express')
var router = module.exports = express.Router()

// all these routes are prefixed with /dashboard
router.use(function (req, res, next) {
  if (!req.user) {
    return res.redirect('/login')
  }
  next()
})

router.route('/')
  .get(function (req, res, next) {
    console.log('[dashboard.js] ', req.path)
    console.log('[dashboard.js] user:', req.user)
    console.log('[dashboard.js] locals:', res.locals)
    return res.render('dashboard', {
      pagetitle: 'Converse'
    })
  })
router.route('/notifications')
  .get(function (req, res, next) {
    return res.render('partials/dashboard/notifications', {
      title: 'Your Notifications'
    })
  })
router.route('/friend/add')
  .get(function (req, res, next) {
    return res.render('add', {
      title: 'Add a friend'
    })
  })
  .post(function (req, res, next) {
    if (!req.body.email) {
      return res.render('add', {
        title: 'Add a friend',
        notification: {
          severity: 'warn',
          message: 'You have to submit an email to add a friend!'
        }
      })
    }
    req.user.addFriend(req.body.email, function (err, notification) {
      if (err) {
        next(err)
      }
      console.log('[dashboard.js] user:', req.user.displayName)
      console.log('[dashboard.js] friend notification sent:', notification)
      return res.render('add', {
        title: 'Add a friend',
        notification: {
          severity: 'success animated fadeOutUp',
          message: 'We\'ve sent a request for you!'
        }
      })
    })
  })
