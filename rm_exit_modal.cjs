const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(/\/\/ Exit Intent Modal[\s\S]*?if \(overlay && e\.target === overlay\) overlay\.classList\.remove\('active'\);\n\s*\}\);\n\s*\}\n/g, '');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Removed exit intent modal");
