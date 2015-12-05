var express = require('express');

var app = express();

app.use(express.static('public'));
app.set('view engine', 'jade');

app.locals.sitename = 'Converse';

app.get('/', function(req, res){
  res.render('index', {
    user: 'TempUser',
    pagetitle: 'Home Page'
  });
});

app.listen(3000);

console.log('[converse] app listening on 3000');
