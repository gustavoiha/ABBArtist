var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

// ABB Robot instructions file
var instructionsPath = 'scripts/target.txt';

// Server port
var ROBOT_SERVER_PORT = 8080;

// Robot's current state
var state = {
  speed: 0,
  x: 0,
  y: 0,
  z: 0
};

// Just for testing
var counter = {
  x: 1,
  y: 2
};

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next){

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

// Get and parse data from fron-end
app.post('/', function(request, response){

    state = request.body;

    // Write state in instructions file
    goToState(state);

    console.log(state);

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('thanks');
});

app.get('/', function(req, res){
  res.end('Hi!');
});

app.listen(ROBOT_SERVER_PORT);

console.log('Server initiated. Listening at http://localhost:' + ROBOT_SERVER_PORT);

// Checks if file exists and clears it in case it does
fs.stat(instructionsPath, function(err, stat) {

  // If file exists, clear it
  if(err == null) {
    console.log(instructionsPath + ' exists');

    fs.writeFile(instructionsPath, '', function(err) {
      if (err) throw err;
      console.log(instructionsPath + ' has been cleared');
    });
  }
});

// Opens file data stream
var instructions = fs.createWriteStream(instructionsPath, {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

/*
** Sends robot to desired state
*/
goToState = function(state){
  instructions.write(state.speed + ':' + state.x + '|' + state.y + '|' + state.z + ';' + '\r\n');
}
