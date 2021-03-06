// Load modules
var express = require('express');
var debug = require('debug')('app');
var _ = require('lodash');
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

app.param('personId', function (req, res, next, personId) {
  debug("personId found:",personId);
  var person = _.find(personData, function(it) {
    return personId == it.id;
  });
  debug("person:", person);
  req.person = person;
  next();
});

var getAllPersons = function(req,res) {
	var response = personData;
	res.send(JSON.stringify(response))
}
app.get('/persons', getAllPersons);

var getPerson = function(req, res) {
  if (req.person) {
	res.status(200).send(JSON.stringify(req.person));
  }
  else {
    res.status(400).send({ message: "Unrecognized identifier: " + identifier });
  }
};

app.get('/persons/:personId', getPerson);

var deletePerson = function(req, res) {
  if (req.person) {
    debug("Removing", req.person.firstName, req.person.lastName);
    _.remove(personData, function(it) {
      it.id === req.person.id;
    });
    debug("personData=", personData);
    var response = { message: "Deleted successfully" };
    res.status(200).jsonp(response);
  }
  else {
    var response = { message: "Unrecognized person identifier"};
    res.status(404).jsonp(response);
  }
};

app.delete('/persons/:personId', deletePerson);

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

