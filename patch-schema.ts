import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');
content = content.replace(
  /"image": blogImage \? \(blogImage\.startsWith\('http'\) \? blogImage : `\$\{baseUrl\}\$\{blogImage\}`\) : `\$\{baseUrl\}\/whatsapp_order_preview\.png`,/,
  '"image": blogImage ? (blogImage.startsWith(\'http\') ? blogImage : blogImage.startsWith(\'data:image\') ? `${baseUrl}/api/seo/images/${slug}.jpg` : `${baseUrl}${blogImage}`) : `${baseUrl}/whatsapp_order_preview.png`,'
);
fs.writeFileSync('server.ts', content);
