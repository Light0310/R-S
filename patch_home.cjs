const fs = require('fs');
let code = fs.readFileSync('src/components/Home.tsx', 'utf8');

// Replace reviewCount in schema
code = code.replace('"reviewCount": "15340"', '"reviewCount": "375"');

// Replace UI text
code = code.replace('<span class="text-3xl font-bold text-white tracking-tight mb-1">15,000+</span>', '<span class="text-3xl font-bold text-white tracking-tight mb-1">375+</span>');

fs.writeFileSync('src/components/Home.tsx', code);
console.log('Home.tsx patched');
