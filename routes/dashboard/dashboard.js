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
    
  })
  .get(function (req, res, next) {
    console.log(req.path)
    console.log('user:', req.user)
    return res.render('dashboard', {
      pagetitle: 'Converse',
      user: req.user
    })
  })
