// Pulling in our dependencies
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  res.send('favorites route');
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return
  } else {
    var data = JSON.parse(fs.readFileSync('./data.json'));
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  }
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});