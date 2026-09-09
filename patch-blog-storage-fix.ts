import fs from 'fs';

let content = fs.readFileSync('src/services/blogStorage.ts', 'utf-8');

// In saveBlogPost: 
content = content.replace(
  /cover_image: post\.cover_image\?\.startsWith\('data:image'\)[^\n]*/,
  'cover_image: post.cover_image'
);

// In updateBlogPost:
content = content.replace(
  /existing\.cover_image = updates\.cover_image\?\.startsWith\('data:image'\)[^\n]*/,
  'existing.cover_image = updates.cover_image;'
);

fs.writeFileSync('src/services/blogStorage.ts', content);
console.log('Patched blogStorage.ts');
