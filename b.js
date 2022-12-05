var readline = require('readline');
var fs = require('fs');

var myInterface = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

const stacks = [[], [], [], [], [], [], [], [], []];
let lineSplit;
let len;
let from;
let to;
let stackFound;
let res = '';

myInterface.on('line', function (line) {
  if (line[0] === '[') {
    for (let i = 0; i < 9; i++) {
      stackFound = line[i * 4 + 1]
      if (stackFound && stackFound[0] !== ' ') {
        stacks[i].unshift(line[i * 4 + 1]);
      }
    }
  }

  if (line[0] === 'm') {
    lineSplit = line.split(' ');

    len = Number.parseInt(lineSplit[1]);
    from = Number.parseInt(lineSplit[3]) - 1;
    to = Number.parseInt(lineSplit[5]) - 1;
    stacks[to].splice(stacks[to].length, 0, ...stacks[from].splice(stacks[from].length - len, len));
  };

}).on('close', () => {
  for (let i = 0; i < 9; i++) {
    res += stacks[i][stacks[i].length - 1];
  }
  console.log(res);
});
