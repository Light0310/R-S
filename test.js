import fs from 'fs';
console.log(fs.readFileSync('src/services/contentGenerator.ts', 'utf8').includes('A professional, high-end tech blog cover'));
