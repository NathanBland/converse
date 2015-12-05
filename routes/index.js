var express = require('express')

var router = module.exports = express.Router()

router.use(require('./auth'))
router.use(require('./core'))
router.use(require('./error'))
