var express = require('express')
var sass = require('node-sass-middleware')
var path = require('path')
var mongoose = require('mongoose')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var routes = require('./routes/')

mongoose.connect('mongodb://' + (process.env.IP || 'localhost') + '/data')
console.log('[server.js] connected to mongodb://' + (process.env.IP || 'localhost') + '/data')

var app = express()

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
app.set('port', process.env.PORT || 3000)
app.set('ip', process.env.IP || '0.0.0.0')

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
app.use(routes)

// Run the server
var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app listening on https://%s:%s', address.address, address.port)
})
