const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(/href="\/\\$\{currentLang\}\/privacy"/g, 'href="/privacy"');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Updated Home.tsx");
