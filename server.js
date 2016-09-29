// ========
// REQUIRES
// ========
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');

var app = express();
var searchTerm; 

// ========
// SET / USE STATEMENTS
// ========
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// ========
// ROUTES
// ========

app.get('/', function(req, res) {
  res.render("index");
});

app.post('/search', function(req, res) {
  searchQuery = req.body.searchQuery;
  res.redirect('/search');
});

app.get('/search', function(req, res) {
  var qs = { s: searchQuery, plot: 'short', r: 'json' };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, 
  function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
      res.render("search", {search: data.Search});      
    }
    else{
      res.send("sorry!! bad request, please try again");
    }
  });
});

app.get("/show/:imdbID", function(req, res){
  console.log(req.params.imdbID);
  var qs = { i: req.params.imdbID, plot: 'full', r: 'json'};

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  },
  function(error, response, body){
    if(!error && response.statusCode == 200){
      var movie = JSON.parse(body);
      res.render("show", {movieData: movie})
    }
    else{
      res.send("sorry!! bad request, try again");
    }
  });
});


// ========
// LISTEN
// ========

app.listen(3000, function(){
  console.log("Listening on port 3000");
});