var express = require('express')
// var nodemailer = require('nodemailer')
var User = require('../models/user')

var router = module.exports = express.Router()

router.get('/forgot', function (req, res) {
  if (!req.user) {
    res.render('reset/password')
  } else {
    res.redirect('/')
  }
})

router.get('/forgot/sent', function (req, res) {
  res.render('reset/password', {
    notification: {
      severity: 'success',
      message: 'Request sent'
    }
  })
})

router.post('/forgot', function (req, res) {
  User.find({email: req.body.email}, function (err, user) {
    if (err) {
      console.log(err)
    }
    console.log(user)
    if (user[0]) {
      var mailOptions = {
        to: user[0].email,
        from: 'noreply@noactualurl.xyz',
        subject: 'Converse Password Reset',
        text: 'A password reset for ' + user[0].displayName + ' was requested.'
      }
      // Send email
      console.log('[reset.js] reset for ' + req.body.email + ' sent')
      res.redirect('forgot/sent')
    } else {
      console.log('[reset.js] reset for ' + req.body.email + ' failed')
      res.render('reset/password', {
        notification: {
          severity: 'error',
          message: 'Request failed'
        }
      })
    }
  })
})
