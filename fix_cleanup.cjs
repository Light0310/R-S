const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(/clearTimeout\(initialToastTimeout\);\n/g, '');
content = content.replace(/clearInterval\(socialProofInterval\);\n/g, '');
content = content.replace(/if \(toast && document\.body\.contains\(toast\)\) document\.body\.removeChild\(toast\);\n/g, '');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Cleaned up social proof interval references");
