const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

let lines = content.split('\n');

for (let i = 0; i < 645; i++) {
  lines[i] = lines[i].replace(/class="/g, 'className="');
}

fs.writeFileSync('src/components/Home.tsx', lines.join('\n'), 'utf8');
