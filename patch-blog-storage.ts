import fs from 'fs';
let content = fs.readFileSync('src/services/blogStorage.ts', 'utf-8');

// Replace in saveBlogPost
content = content.replace(
    /cover_image: post\.cover_image\?\.startsWith\('data:image'\) \? `\/api\/seo\/images\/\$\{cleanSlug\}\.jpg` : post\.cover_image/g,
    "cover_image: post.cover_image?.startsWith('data:image') ? `/api/seo/images/${cleanSlug}.${post.cover_image.includes('svg+xml') ? 'svg' : 'jpg'}` : post.cover_image"
);

content = content.replace(
    /const base64Data = post\.cover_image\.replace\(\/\^data:image\\\\\/\\\\w\+;base64,\/, ''\);\n\s*const imgBuffer = Buffer\.from\(base64Data, 'base64'\);\n\s*fs\.writeFileSync\(path\.join\(process\.cwd\(\), 'src', 'content', 'blog', 'images', `\$\{cleanSlug\}\.jpg`\), imgBuffer\);/g,
    `const isSvg = post.cover_image.includes('svg+xml');
    const base64Data = post.cover_image.replace(/^data:image\\/\\w+(\\+xml)?;base64,/, '');
    const imgBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${cleanSlug}.\${isSvg ? 'svg' : 'jpg'}\`), imgBuffer);`
);

// Replace in updateBlogPost
content = content.replace(
    /existing\.cover_image = updates\.cover_image\?\.startsWith\('data:image'\) \? `\/api\/seo\/images\/\$\{newSlug\}\.jpg` : updates\.cover_image;/g,
    "existing.cover_image = updates.cover_image?.startsWith('data:image') ? `/api/seo/images/${newSlug}.${updates.cover_image.includes('svg+xml') ? 'svg' : 'jpg'}` : updates.cover_image;"
);

content = content.replace(
    /const base64Data = updates\.cover_image\.replace\(\/\^data:image\\\\\/\\\\w\+;base64,\/, ''\);\n\s*const imgBuffer = Buffer\.from\(base64Data, 'base64'\);\n\s*fs\.writeFileSync\(path\.join\(process\.cwd\(\), 'src', 'content', 'blog', 'images', `\$\{newSlug\}\.jpg`\), imgBuffer\);/g,
    `const isSvg = updates.cover_image.includes('svg+xml');
    const base64Data = updates.cover_image.replace(/^data:image\\/\\w+(\\+xml)?;base64,/, '');
    const imgBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'blog', 'images', \`\${newSlug}.\${isSvg ? 'svg' : 'jpg'}\`), imgBuffer);`
);

fs.writeFileSync('src/services/blogStorage.ts', content);
console.log('Patched blogStorage.ts');
