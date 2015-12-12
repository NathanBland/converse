var express = require('express')
var router = module.exports = express.Router()
var bodyParser = require('body-parser')

// Configure body-parser
// var jsonParser = bodyParser.json() // Commented out until in use.
var urlencodedParser = bodyParser.urlencoded({extended: false})
// Using this method recommended from https://github.com/expressjs/body-parser#express-route-specific

// These routes are all prefixed by /profile
router.get('/', urlencodedParser, function (req, res) {
  res.render('profile', {
    user: req.user
  })
})

router.post('/profile/displayname', urlencodedParser, function (req, res) {
  console.log(req.body.displayName)
  res.redirect('/profile')
})
