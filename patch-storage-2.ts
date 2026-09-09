import fs from 'fs';
let content = fs.readFileSync('src/services/blogStorage.ts', 'utf-8');

content = content.replace(
  /function ensureDirectories\(\) \{/,
  `function ensureDirectories() {\n  const imagesDir = path.join(process.cwd(), 'src', 'content', 'blog', 'images');\n  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });`
);

fs.writeFileSync('src/services/blogStorage.ts', content, 'utf-8');
console.log('Patched ensureDirectories');
