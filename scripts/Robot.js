var fs = require('fs');

var state = {
  speed: 0,
  x: 0,
  y: 0,
  z: 0
};

var counter = {
  x: 1,
  y: 2
};

var instructions = fs.createWriteStream('target.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

setInterval(function(){
  instructions.write('400:' + (150 + counter.x) + '|' + (200 + counter.y) + '|0;' + '\r\n');
  counter.x += 1;
  counter.y += 2;
}, 1000);

goToState = function(state){
  instructions.write(state.speed + ':' + state.x + '|' + state.y + '|' + state.z + ';' + '\r\n');
}
