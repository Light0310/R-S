import fs from 'fs';
let content = fs.readFileSync('src/routes/seoRoutes.ts', 'utf-8');

if (!content.includes('generateSvgThumbnail')) {
    content = "import { generateSvgThumbnail } from '../services/imageGenerator';\n" + content;
}

content = content.replace(
    /let shortTitle = title\.split[^\}]+imgResponse = await fetch[^\}]+res\.status\(500\)\.json\(\{ success: false, message: 'Failed to generate image' \}\);\n\s*\}/g,
    `let base64Image = generateSvgThumbnail(title);
    res.json({ success: true, image: base64Image });`
);

// Fallback in case regex failed
if (content.includes('pollinations')) {
    // A broader replace
    content = content.replace(/let shortTitle = title\.split\(':'\)(.|\n)*?if \(imgResponse\.ok\) \{(.|\n)*?\} else \{(.|\n)*?\}/, 
    `let base64Image = generateSvgThumbnail(title);
    res.json({ success: true, image: base64Image });`);
}

fs.writeFileSync('src/routes/seoRoutes.ts', content);
console.log('Patched seoRoutes.ts');
