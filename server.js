var express = require('express')
var sass = require('node-sass-middleware')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express()

// Configure sass

app.use(
  sass({
    root: __dirname,
    indentedSyntax: true,
    src: '/sass',
    dest: '/public/css',
    prefix: '/css',
    debug: true
  })
)

// Set static directory to /public
app.use(express.static(path.join(__dirname, 'public')))

// Set Jade as the view engine
app.set('view engine', 'jade')

// Set ip and port for server
app.set('port', process.env.PORT || 3000)
app.set('ip', process.env.IP || '0.0.0.0')

// Configure body-parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})
// Using this method recommended from https://github.com/expressjs/body-parser#express-route-specific

// Configure cookie-parser
app.use(cookieParser('This is a supery-dupery-doo secret that is secrety'))

// Site-wide variables
app.locals.sitename = 'Converse'
app.locals.slogan = "Because social shouldn't involve shouting"

// Routes
app.get('/', function (req, res) {
  res.render('index', {
    user: 'TempUser',
    pagetitle: 'Home Page'
  })
})

app.get('/user/:username', urlencodedParser, function (req, res) {
  console.log(req.path)
  res.render('profile', {
    pagetitle: 'Profile',
    user: req.params.username
  })
})

// Run the server
var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[converse] app listening on https://%s:%s', address.address, address.port)
})
