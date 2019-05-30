/** 
 * This is a simple express server, to show how to proxy weather rquest to DarkSky API.
 */
var express = require('express');
var bodyParser = require('body-parser');
require('es6-promise').polyfill();
require('isomorphic-fetch');
var port = process.env.PORT || 8080;

// Configure app to use bodyParser to parse json data
var app = express(); 
var server = require('http').createServer(app); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test server is working (GET http://localhost:3001/api)
app.get('/api/', function(req, res) {
  res.json({ message: 'Hi, welcome to the server api!' });   
});

var url_prefix = 'http://webtris.highwaysengland.co.uk/api/v1.0/reports/Annual?';
app.get('/api/webtris', function(req, res) {
  try {
    // Retrieves location coordinates (latitude and longitude) from client request query
    
    var parameters = 'sites='+req.query.sites+'&start_date='+req.query.start_date+'&end_date='+req.query.end_date+'&page=1&page_size=2000' ;
    var url = url_prefix + parameters;
    console.log('Fetching '+url);
    
    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
            res.status(response.status).json({'message': 'Bad response from HE webtris server'});
        }
        return response.json();
      })
      .then(function(payload) {
          res.status(200).json(payload);
      });
  } catch(err) {
    console.log("Errors occurs requesting HE webtris API", err);
    res.status(500).json({'message': 'Errors occurs requesting HE webtris API', 'details' : err});
  }
});

// Start the server
server.listen(port);
console.log('Server is listening on port ' + port);
