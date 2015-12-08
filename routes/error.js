var express = require('express')

var router = module.exports = express.Router()

router.use(function (req, res) {
  console.warn('[error.js] 404: Page not found: %s', req.originalUrl)
  res.status(404).render('error', {
    notification: {
      severity: 'error',
      message: "Aw man, you weren't supposed to see this..."
    },
    title: '404 - Page not found'
  })
})
