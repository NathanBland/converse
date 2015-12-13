var express = require('express')
var router = module.exports = express.Router()

// These routes are all prefixed by /profile
router.get('/', function (req, res) {
  console.log(req.user)
  res.render('profile', {
    user: req.user
  })
})

router.post('/displayname', function (req, res) {
  req.user.set({
    displayName: req.body.displayname
  })
  req.user.save(function (err, user) {
    if (err) {
      console.warn(err)
    }
    return res.redirect('/profile')
  })
})

router.post('/password', function (req, res) {
  console.log(req.body)
  res.redirect('/profile')
})

router.post('/email', function (req, res) {
  req.user.set({
    email: req.body.email
  })
  req.user.save(function (err, user) {
    if (err) {
      console.warn(err)
    }
    return res.redirect('/profile')
  })
})
