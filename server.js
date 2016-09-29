// ========
// REQUIRES
// ========
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();


// ========
// SET / USE STATEMENTS
// ========
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json());


// ========
// ROUTES
// ========
app.get('/', express.static(path.join(__dirname, 'public')));


app.post('/', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  data.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.redirect('/');
});

app.get('/favorites', function(req, res){
  res.send('**favorites route**');
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  res.render('index', {data});
});

// app.get('favorites', function(req, res){
//   if(!req.body.name || !req.body.oid){
//     res.send("Error");
//     return
//   } else {
//     var data = JSON.parse(fs.readFileSync('./data.json'));
//     data.push(req.body);
//     fs.writeFile('./data.json', JSON.stringify(data));
//     res.setHeader('Content-Type', 'application/json');
//     res.send(data);
//   }
// });

// ========
// LISTEN
// ========

app.listen(3000, function(){
  console.log("Listening on port 3000");
});