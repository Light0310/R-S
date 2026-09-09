const fs = require('fs');
let content = fs.readFileSync('src/services/blogStorage.ts', 'utf8');

let regex = /if \(updates\.cover_image\?\.startsWith\('data:image'\)\) \{[\s\S]*?const mdContent = formatMarkdownWithFrontmatter\(\{/m;
let replacement = `if (updates.cover_image?.startsWith('data:image')) {
      const isSvg = updates.cover_image.includes('svg+xml');
      const base64Data = updates.cover_image.replace(/^data:image\\/\\w+(\\+xml)?;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${newSlug}.\${isSvg ? 'svg' : 'jpg'}\`), imgBuffer);
    }
    const mdContent = formatMarkdownWithFrontmatter({`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/services/blogStorage.ts', content);
