var fs = require('fs');

var instructions = fs.createWriteStream('target.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

setInterval(function(){
  instructions.write('400:152|200|0;');
}, 1000);
