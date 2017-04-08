var fs = require('fs');

// ABB Robot instructions file
var instructionsPath = 'target.txt';

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

// Just for testing
setInterval(function(){
  goToState({
    speed: 400,
    x: counter.x,
    y: counter.y,
    z: 0
  });
  counter.x += 1;
  counter.y += 2;
}, 1000);

/*
** Sends robot to desired state
*/
goToState = function(state){
  instructions.write(state.speed + ':' + state.x + '|' + state.y + '|' + state.z + ';' + '\r\n');
}
