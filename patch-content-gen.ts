import fs from 'fs';
let content = fs.readFileSync('src/services/contentGenerator.ts', 'utf-8');

if (!content.includes('generateSvgThumbnail')) {
    content = "import { generateSvgThumbnail } from './imageGenerator';\n" + content;
}

// Block 1
content = content.replace(
    /let shortTitle = \(articleData\.title(.*?|\n)*?catch \(imgErr: any\) \{\n\s*console\.warn\(`\[Content Generator\] Image generation failed:`, imgErr\.message\);\n\s*\}/m,
    "base64Image = generateSvgThumbnail(articleData.title || queryString, articleData.description);"
);

// Block 2
content = content.replace(
    /let shortTitle = queryString\.split(.*?|\n)*?catch \(imgErr\) \{\n\s*console\.warn\('\[Content Generator\] Fallback image error:', imgErr\);\n\s*\}/m,
    "fallbackImage = generateSvgThumbnail(queryString, `Comprehensive guide on ${queryString}.`);"
);

fs.writeFileSync('src/services/contentGenerator.ts', content);
console.log('Patched contentGenerator.ts');
