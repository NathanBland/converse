var express = require('express')
var router = module.exports = express.Router()

router.route('/dashboard')
  .all(function (req, res, next) {
    if (!req.user) {
      return res.redirect('/login')
    }
    next()
  })
  .get(function (req, res, next) {
    req.user.findNotifications(function (err, notifications) {
      if (err) {
        console.warn('[dashboard.js] err getting notifications:', err)
        next(err)
      }
      res.locals.notifications = notifications
      next()
    })
  })
  .get(function (req, res, next) {
    console.log(req.path)
    console.log('user:', req.user)
    return res.render('dashboard', {
      pagetitle: 'Converse',
      user: req.user
    })
  })
