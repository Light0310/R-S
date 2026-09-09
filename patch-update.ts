import fs from 'fs';
let content = fs.readFileSync('src/services/blogStorage.ts', 'utf-8');

content = content.replace(
  /status\?\: \'published\' \| \'draft\'\;\n  \}\n\)\: Promise\<BlogPostItem \| null\> \{/,
  `status?: 'published' | 'draft';\n    cover_image?: string;\n  }\n): Promise<BlogPostItem | null> {`
);

content = content.replace(
  /if \(updates\.status\) existing\.status = updates\.status;/,
  `if (updates.status) existing.status = updates.status;\n  if (updates.cover_image !== undefined) {\n    existing.cover_image = updates.cover_image?.startsWith('data:image') ? \`/api/seo/images/\${newSlug}.jpg\` : updates.cover_image;\n  }`
);

content = content.replace(
  /const mdContent = formatMarkdownWithFrontmatter\(\{/,
  `if (updates.cover_image?.startsWith('data:image')) {
      const base64Data = updates.cover_image.replace(/^data:image\\/\\w+;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${newSlug}.jpg\`), imgBuffer);
    }
    const mdContent = formatMarkdownWithFrontmatter({`
);

content = content.replace(
  /SET title = EXCLUDED\.title, content = EXCLUDED\.content, description = EXCLUDED\.description, tags = EXCLUDED\.tags, status = EXCLUDED\.status/,
  `SET title = EXCLUDED.title, content = EXCLUDED.content, description = EXCLUDED.description, tags = EXCLUDED.tags, status = EXCLUDED.status, cover_image = EXCLUDED.cover_image`
);

content = content.replace(
  /UPDATE blog_posts SET title = \$1, content = \$2, slug = \$3, status = \$4, description = \$5, tags = \$6 WHERE/,
  `UPDATE blog_posts SET title = $1, content = $2, slug = $3, status = $4, description = $5, tags = $6, cover_image = $8 WHERE`
);

fs.writeFileSync('src/services/blogStorage.ts', content, 'utf-8');
console.log('Patched updateBlogPost');
