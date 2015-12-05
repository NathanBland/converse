var express = require('express')
var sass = require('node-sass-middleware')
var path = require('path')

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

// Site-wide variables
app.locals.sitename = 'Converse'

// Routes
app.get('/', function (req, res) {
  res.render('index', {
    user: 'TempUser',
    pagetitle: 'Home Page'
  })
})

// Start listening
app.listen(3000)

console.log('[converse] app listening on 3000')
