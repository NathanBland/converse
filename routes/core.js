var express = require('express')
var bodyParser = require('body-parser')

var router = module.exports = express.Router()

// Configure body-parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})
// Using this method recommended from https://github.com/expressjs/body-parser#express-route-specific

// Routes
router.get('/', function (req, res) {
  res.render('index', {
    user: 'TempUser',
    pagetitle: 'Home Page'
  })
})

router.get('/user/:username', urlencodedParser, function (req, res) {
  console.log(req.path)
  res.render('profile', {
    pagetitle: 'Profile',
    user: req.params.username
  })
})
