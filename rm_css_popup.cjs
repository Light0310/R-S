const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/\/\* Live Social Proof Toast CSS \*\/[\s\S]*?\.social-proof-time \{[\s\S]*?\}/g, '');
// Specifically looking at lines 1180 to 1230 roughly.

const regex1 = /\.social-proof-toast \{[\s\S]*?\.social-proof-time \{[\s\S]*?\}/;
content = content.replace(regex1, '');

// remove mobile social proof toast media query
content = content.replace(/\.social-proof-toast \{[\s\S]*?z-index: 9998;\s*\}/g, '');

fs.writeFileSync('index.html', content, 'utf8');
