import fs from 'fs';
let content = fs.readFileSync('src/services/blogStorage.ts', 'utf-8');

// Update ensureDirectories
content = content.replace(
  /if \(\!fs\.existsSync\(BLOG_DIR\)\) fs\.mkdirSync\(BLOG_DIR, \{ recursive: true \}\);/,
  `if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });\n  const imagesDir = path.join(process.cwd(), 'src', 'content', 'blog', 'images');\n  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });`
);

// Update saveBlogPost
content = content.replace(
  /cover_image: post\.cover_image/,
  `cover_image: post.cover_image?.startsWith('data:image') ? \`/api/seo/images/\${cleanSlug}.jpg\` : post.cover_image`
);

content = content.replace(
  /const mdContent = formatMarkdownWithFrontmatter\(\{/,
  `if (post.cover_image?.startsWith('data:image')) {
    const base64Data = post.cover_image.replace(/^data:image\\/\\w+;base64,/, '');
    const imgBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${cleanSlug}.jpg\`), imgBuffer);
  }
  const mdContent = formatMarkdownWithFrontmatter({`
);

fs.writeFileSync('src/services/blogStorage.ts', content, 'utf-8');
console.log('Patched blogStorage.ts');
