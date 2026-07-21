const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(/width="32" height="32" style="width: 32px; height: 32px;" /g, '');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
