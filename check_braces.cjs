const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

let stack = [];
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === '{') {
      stack.push({ line: i + 1, col: j + 1 });
    } else if (line[j] === '}') {
      if (stack.length === 0) {
        console.log(`Unmatched } at line ${i + 1}, col ${j + 1}: ${line.trim()}`);
      } else {
        stack.pop();
      }
    }
  }
}

if (stack.length > 0) {
  console.log(`Unmatched { at line ${stack[0].line}, col ${stack[0].col}`);
}
