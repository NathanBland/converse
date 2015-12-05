var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');

var app = express();

// Configure sass

/** Middleware not working currently.
  * Use the following command instead:
  * sass --watch sass:public/css
  */

/*
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/css'),
  debug: true,
  outputStyle: 'compressed',
  prefix: '/css'
}));
*/

// Set static directory to /public
app.use(express.static(path.join(__dirname, 'public')));

// Set Jade as the view engine
app.set('view engine', 'jade');

// Site-wide variables
app.locals.sitename = 'Converse';

// Routes
app.get('/', function(req, res){
  res.render('index', {
    user: 'TempUser',
    pagetitle: 'Home Page'
  });
});

// Start listening
app.listen(3000);

console.log('[converse] app listening on 3000');
