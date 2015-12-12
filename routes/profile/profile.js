var express = require('express')
var router = module.exports = express.Router()
var bodyParser = require('body-parser')

// Configure body-parser
// var jsonParser = bodyParser.json() // Commented out until in use.
var urlencodedParser = bodyParser.urlencoded({extended: false})
// Using this method recommended from https://github.com/expressjs/body-parser#express-route-specific

// These routes are all prefixed by /profile
router.get('/', urlencodedParser, function (req, res) {
  console.log(req.user)
  res.render('profile', {
    user: req.user
  })
})

router.post('/displayname', urlencodedParser, function (req, res) {
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

router.post('/password', urlencodedParser, function (req, res) {
  console.log(req.body)
  res.redirect('/profile')
})

router.post('/email', urlencodedParser, function (req, res) {
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

router.post('/details', urlencodedParser, function (req, res) {
  console.log(req.body)
  res.redirect('/profile')
})
