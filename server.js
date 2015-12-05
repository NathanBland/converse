var express = require('express');

var app = express();

app.use(express.static('public'));
//app.set('view engine', 'jade');

app.get('/', function(req, res){
  /*
  res.render('index', {
    user: 'Temp'
  });
  */
  res.send('Hello from Whiteboards! Welcome to Converse!');
});

app.listen(3000);

console.log('[converse] app listening on 3000');
