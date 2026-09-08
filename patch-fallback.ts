import fs from 'fs';
let content = fs.readFileSync('src/services/contentGenerator.ts', 'utf-8');
content = content.replace(
  `// Ignore fallback image errors`,
  `console.warn('[Content Generator] Fallback image error:', imgErr);`
);
content = content.replace(
  `const imgResponse = await fetch(imageUrl);`,
  `console.log("Fetching fallback image:", imageUrl);\n    const imgResponse = await fetch(imageUrl, { headers: { "User-Agent": "Mozilla/5.0" } });\n    console.log("Fallback image status:", imgResponse.status);`
);
fs.writeFileSync('src/services/contentGenerator.ts', content, 'utf-8');
