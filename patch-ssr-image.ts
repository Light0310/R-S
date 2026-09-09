import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');
content = content.replace(
  /const fullImageUrl = blogImage\.startsWith\('http'\) \? blogImage : `\$\{baseUrl\}\$\{blogImage\}`;/,
  "const fullImageUrl = blogImage.startsWith('http') ? blogImage : blogImage.startsWith('data:image') ? `${baseUrl}/api/seo/images/${slug}.jpg` : `${baseUrl}${blogImage}`;"
);
fs.writeFileSync('server.ts', content);
