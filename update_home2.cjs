const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(/\.replace\('href="#privacy"', \`href="\/\\$\{currentLang\}\/privacy"\`\)/g, `.replace('href="#privacy"', 'href="/privacy"')`);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Updated Home.tsx");
