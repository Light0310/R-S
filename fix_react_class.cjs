const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// replace all class=" with className="
content = content.replace(/class="/g, 'className="');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
