var express = require('express')

var router = module.exports = express.Router()

router.use(function (req, res) {
  console.warn('[error.js] 404: Page not found: %s', req.originalUrl)
  res.status(404).render('error', {
    notification: {
      severity: 'error',
      message: 'Aw man, you weren\'t supposed to see this...'
    },
    user: req.user,
    title: '404 - Page not found'
  })
})
router.use(function (err, req, res, next) {
  console.warn('[error.js] 500: Internal server error:', err.stack)
  res.status(500).render('error', {
    notification: {
      severity: 'error',
      message: 'Aw man, you weren\'t supposed to see this...'
    },
    user: req.user,
    title: 'Uh, Sorry'
  })
})
