const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');
content = content.replace(/href="\/privacy"/g, 'href="/privacy.html"');
content = content.replace(/href="\/[a-z]{2}\/privacy"/g, 'href="/privacy.html"');
fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Updated Home.tsx");
