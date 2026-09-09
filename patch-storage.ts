import fs from 'fs';
let content = fs.readFileSync('src/services/blogStorage.ts', 'utf-8');

// Fix saveBlogPost
content = content.replace(
  /if \(post\.cover_image\?\.startsWith\('data:image'\)\) \{[^}]+\}\n\s*if \(updates\.cover_image\?\.startsWith\('data:image'\)\) \{[^}]+\}/m,
  `if (post.cover_image?.startsWith('data:image')) {
      const isSvg = post.cover_image.includes('svg+xml');
      const base64Data = post.cover_image.replace(/^data:image\\/\\w+(\\+xml)?;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${cleanSlug}.\${isSvg ? 'svg' : 'jpg'}\`), imgBuffer);
    }`
);

// Fix updateBlogPost
content = content.replace(
  /if \(updates\.cover_image\?\.startsWith\('data:image'\)\) \{[^}]+\}/g,
  `if (updates.cover_image?.startsWith('data:image')) {
      const isSvg = updates.cover_image.includes('svg+xml');
      const base64Data = updates.cover_image.replace(/^data:image\\/\\w+(\\+xml)?;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${newSlug}.\${isSvg ? 'svg' : 'jpg'}\`), imgBuffer);
    }`
);

fs.writeFileSync('src/services/blogStorage.ts', content);
