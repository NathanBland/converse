var express = require('express')
var router = module.exports = express.Router()

// all these routes are prefixed with /dashboard
router.route('/')
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
router.route('/friend/add')
  .get(function (req, res, next) {
    return res.render('add', {
      title: 'Add a friend',
      user: req.user
    })
  })
  .post(function (req, res, next) {
    if (!req.body.email) {
      return res.render('add', {
        title: 'Add a friend',
        notification: {
          severity: 'warn',
          message: 'You have submit an email to add a friend!'
        },
        user: req.user
      })
    }
    req.user.addFriend(req.body.email, function (err, friend) {
      if (err) {
        next(err)
      }
      console.log('[dashboard.js] friend notification sent:', friend)
      return res.render('add', {
        title: 'Add a friend',
        notification: {
          severity: 'success animated fadeOutUp',
          message: 'We\'ve sent a request for you!'
        }
      })
    })
  })
