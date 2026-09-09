const fs = require('fs');
let content = fs.readFileSync('src/services/blogStorage.ts', 'utf8');

// Replace the try block inside saveBlogPost
let search1 = `  // 1. Write to Disk Markdown File
  try {
    if (post.cover_image?.startsWith('data:image')) {
    const base64Data = post.cover_image.replace(/^data:image\\/\\w+;base64,/, '');
    const imgBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${cleanSlug}.jpg\`), imgBuffer);
  }
  if (updates.cover_image?.startsWith('data:image')) {
      const isSvg = updates.cover_image.includes('svg+xml');
      const base64Data = updates.cover_image.replace(/^data:image\\/\\w+(\\+xml)?;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${newSlug}.\${isSvg ? 'svg' : 'jpg'}\`), imgBuffer);
    }.jpg\`), imgBuffer);
    }
    const mdContent = formatMarkdownWithFrontmatter({`;

let replacement1 = `  // 1. Write to Disk Markdown File
  try {
    if (post.cover_image?.startsWith('data:image')) {
      const isSvg = post.cover_image.includes('svg+xml');
      const base64Data = post.cover_image.replace(/^data:image\\/\\w+(\\+xml)?;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${cleanSlug}.\${isSvg ? 'svg' : 'jpg'}\`), imgBuffer);
    }
    const mdContent = formatMarkdownWithFrontmatter({`;

// if exact match doesn't work, let's just do a regex for the entire try block.
let regex1 = /\/\/ 1\. Write to Disk Markdown File\s*try \{\s*if \(post\.cover_image\?\.startsWith\('data:image'\)\) \{[\s\S]*?const mdContent = formatMarkdownWithFrontmatter\(\{/m;

content = content.replace(regex1, replacement1);

fs.writeFileSync('src/services/blogStorage.ts', content);
