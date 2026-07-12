const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/import PrivacyPolicy from '\.\/components\/PrivacyPolicy';\n?/g, '');
content = content.replace(/.*<Route path="\/privacy".*\n?/g, '');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Updated App.tsx");
