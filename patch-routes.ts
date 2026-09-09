import fs from 'fs';
let content = fs.readFileSync('src/routes/seoRoutes.ts', 'utf-8');

content = content.replace(
  /if \(\!post\.cover_image\.startsWith\('data:image'\)\) \{\s+res\.redirect\(post\.cover_image\);\s+return;\s+\}\s+\/\/ Convert base64 data to binary\s+const base64Data = post\.cover_image\.replace\(\/\^data:image\\\\\/\\\\w\+;base64,\/,\s+''\);\s+const imgBuffer = Buffer\.from\(base64Data, 'base64'\);/,
  `const imgPath = path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${slug}.jpg\`);
    if (!fs.existsSync(imgPath)) {
      if (post.cover_image.startsWith('http') || post.cover_image.startsWith('/')) {
        res.redirect(post.cover_image);
        return;
      }
      res.status(404).send('Image not found');
      return;
    }
    const imgBuffer = fs.readFileSync(imgPath);`
);

// We need to import 'path' and 'fs' if they aren't imported. Let's check imports.
if (!content.includes("import fs from")) {
  content = "import fs from 'fs';\nimport path from 'path';\n" + content;
}

fs.writeFileSync('src/routes/seoRoutes.ts', content, 'utf-8');
console.log('Patched seoRoutes.ts');
