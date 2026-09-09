import fs from 'fs';

let bp = fs.readFileSync('src/components/BlogPost.tsx', 'utf-8');
bp = bp.replace(
  /const coverImage = post\.cover_image\?\.startsWith\('data:image'\)\s*\?\s*`\/api\/seo\/images\/\$\{post\.slug\}\.jpg`\s*:\s*post\.cover_image\s*\?\s*post\.cover_image/m,
  "const coverImage = post.cover_image ? post.cover_image"
);
fs.writeFileSync('src/components/BlogPost.tsx', bp);

let bl = fs.readFileSync('src/components/BlogList.tsx', 'utf-8');
bl = bl.replace(
  /const coverImage = post\.cover_image\?\.startsWith\('data:image'\)\s*\?\s*`\/api\/seo\/images\/\$\{post\.slug\}\.jpg`\s*:\s*post\.cover_image\s*\?\s*post\.cover_image/m,
  "const coverImage = post.cover_image ? post.cover_image"
);
fs.writeFileSync('src/components/BlogList.tsx', bl);
console.log('Patched components');
