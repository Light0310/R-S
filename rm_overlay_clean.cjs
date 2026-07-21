const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(/if \(overlay\) \{[\s\S]*?document\.body\.removeChild\(overlay\);\n\s*\}\n/g, '');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
