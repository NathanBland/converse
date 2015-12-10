var express = require('express')
var app = express()
// Run the server
app.set('port', process.env.PORT || 3000)
app.set('ip', process.env.IP || '0.0.0.0')

var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app listening on https://%s:%s', address.address, address.port)
})
var io = require('socket.io').listen(server)

var sass = require('node-sass-middleware')
var path = require('path')
var mongoose = require('mongoose')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var passportSocketIo = require('passport.socketio')
// var socketManager = require('./socketio')(io)
var routes = require('./routes/')

mongoose.connect('mongodb://' + (process.env.IP || 'localhost') + '/data')
console.log('[server.js] connected to mongodb://' + (process.env.IP || 'localhost') + '/data')

// Configure sass

app.use(
  sass({
    root: __dirname,
    indentedSyntax: true,
    src: '/sass',
    dest: '/public/css',
    prefix: '/css',
    debug: false
  })
)

// Set static directory to /public
app.use(express.static(path.join(__dirname, 'public')))

// Set Jade as the view engine
app.set('view engine', 'jade')

// Set ip and port for server

// Configure cookie-parser

// Site-wide variables
app.locals.sitename = 'Converse'
app.locals.slogan = 'Because social shouldn\'t involve shouting'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
var sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
})
app.use(cookieParser('config.cookieSecret')) // these values are temporary and will be chnaged
app.use(session({
  secret: 'config.sessionSecret', // these values are temporary and will be chnaged
  key: 'config.sessionSecret', // these values are temporary and will be chnaged
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}))
/* io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'config.sessionSecret', // the name of the cookie where express/connect stores its session_id
  secret: 'config.cookieSecret', // the session_secret to parse the cookie
  store: sessionStore, // we NEED to use a sessionstore. no memorystore please
  success: socketManager.onAuthorizeSuccess, // *optional* callback on success - read more below
  fail: socketManager.onAuthorizeFail, // *optional* callback on fail/error - read more below
}))*/
app.use(routes)
