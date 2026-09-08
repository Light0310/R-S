import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog/en');
if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(blogDir, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Check if it has coverImage instead of cover_image
      if (content.includes('coverImage:')) {
        content = content.replace(/coverImage:/g, 'cover_image:');
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated frontmatter in ${file}`);
      }
    }
  }
}

const jsonPath = path.join(process.cwd(), 'src/content/dynamic_posts.json');
if (fs.existsSync(jsonPath)) {
  let content = fs.readFileSync(jsonPath, 'utf-8');
  if (content.includes('"coverImage":')) {
    content = content.replace(/"coverImage":/g, '"cover_image":');
    fs.writeFileSync(jsonPath, content, 'utf-8');
    console.log(`Updated JSON file`);
  }
}
