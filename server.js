var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
  res.send('Hello from Whiteboards! Welcome to Converse!');
});

app.listen(3000);

console.log('[converse] app listening on 3000');
