var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

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

router.get('/privacy', function (req, res) {
  res.render('infopages/privacy')
})

router.get('/help', function (req, res) {
  res.render('infopages/help')
})

router.get('/useragreement', function (req, res) {
  res.render('infopages/terms')
})
