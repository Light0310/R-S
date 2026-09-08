import fs from 'fs';
let content = fs.readFileSync('src/services/contentGenerator.ts', 'utf-8');
content = content.replace(
  /const imgResponse = await fetch\(imageUrl\);/g,
  `const imgResponse = await fetch(imageUrl, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" } });`
);
// Also fix the first one that I messed up with `replace`
content = content.replace(
  /const imgResponse = await fetch\(imageUrl, \{ headers: \{ "User-Agent": "Mozilla\/5\.0" \} \}\);/g,
  `const imgResponse = await fetch(imageUrl, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" } });`
);

fs.writeFileSync('src/services/contentGenerator.ts', content, 'utf-8');
