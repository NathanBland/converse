var express = require('express')
// var bodyParser = require('body-parser') // commented out until used.
// var fs = require('fs')

var router = module.exports = express.Router()

// Routes
router.get('/', function (req, res) {
  return res.render('index', {
    pagetitle: 'Home Page'
  })
})

router.get('/privacy', function (req, res) {
  return res.render('infopages/privacy')
})

router.get('/help', function (req, res) {
  return res.render('infopages/help')
})

router.get('/useragreement', function (req, res) {
  return res.render('infopages/terms')
})
