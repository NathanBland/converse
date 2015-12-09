var express = require('express')
var router = module.exports = express.Router()

router.route('/dashboard')
  .all(function (req, res, next) {
    if (!req.user) {
      return res.redirect('/login')
    }
    next()
  })
  /** Need to think about moving these to their
  * own middleware so that it is availible to all
  * user authenticated pages..
  **/
  .get(function (req, res, next) { // grab notifications
    req.user.findNotifications(function (err, notifications) {
      if (err) {
        console.warn('[dashboard.js] err getting notifications:', err)
        next(err)
      }
      res.locals.notifications = notifications
      next()
    })
  })
  .get(function (req, res, next) { // grab friends
    req.user.findFriends(function (err, friends) {
      if (err) {
        console.warn('[dashboard.js] err getting friends:', err)
        next(err)
      }
      res.locals.friends = friends
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
