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

// Home page
app.get('/', function(req, res) {
  res.render("index");
});

// Post query to search 
app.post('/search', function(req, res) {
  searchQuery = req.body.searchQuery;
  res.redirect('/search');
});

// Get search results
app.get('/search', function(req, res) {
  var qs = { s: searchQuery, plot: 'short', r: 'json' };

  request({ url: 'http://www.omdbapi.com', qs: qs }, 
  function(error, response, body){
    // If there are no error codes and the response code is A-OK...
    if(!error && response.statusCode == 200){
      // ...parse the reponse's JSON containing all the movie info
      var data = JSON.parse(body);
      // ...and render the response
      res.render("search", {search: data.Search}); 
    // Else, if there is an error...       
    } else {
      // ...send a response letting the user know.
      res.send("sorry!! bad request, please try again");
    }
  });
});

// Get a specific movie's information based on the imdb ID
app.get("/show/:imdbID", function(req, res){
  var qs = { i: req.params.imdbID, plot: 'full', r: 'json'};

  request({ url: 'http://www.omdbapi.com', qs: qs},
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