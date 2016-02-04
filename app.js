// Load modules
var express = require('express');
var debug = require('debug')('app');
// Create express instance
var app = express();

// Create a person database
var personData = [
  {
    "id": 1,
    "firstName": "Ted",
    "lastName": "Neward",
    "status": "MEANing"
  },
  {
    "id": 2,
    "firstName": "Brian",
    "lastName": "Randell",
    "status": "TFSing"
  }
];

var getAllPersons = function(req,res) {
	var response = personData;
	res.send(JSON.stringify(response))
}
app.get('/persons', getAllPersons);


app.param('personId', function (req, res, next, personId) {
  debug("personId found:",personId);
  var person = _.find(personData, function(it) {
    return personId == it.id;
  });
  debug("person:", person);
  req.person = person;
  next();
});

var getPerson = function(req, res) {
  if (req.person) {
    res.send(200, JSON.stringify(req.person));
  }
  else {
    res.send(400, { message: "Unrecognized identifier: " + identifier });
  }
};

app.get('/persons/:personId', getPerson);

// Set up a simple route
app.get('/', function (req, res) {
  debug("/ requested");
  res.send('Hello World!');
});
// Start the server
var port = process.env.PORT || 3000;
debug("We picked up",port,"for the port");
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

