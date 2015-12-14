var express = require('express')
var ensureLogin = require('connect-ensure-login')
var ensureLoggedIn = ensureLogin.ensureAuthenticated
var router = module.exports = express.Router()

router.use(require('./auth'))
router.use(require('./core'))
router.use(require('./reset'))
router.use('/dashboard', require('./dashboard/dashboard'), ensureLoggedIn('/login'))
router.use('/profile', require('./profile'), ensureLoggedIn('/login'))
router.use(require('./error'))
