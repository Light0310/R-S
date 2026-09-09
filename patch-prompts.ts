import fs from 'fs';
let content = fs.readFileSync('src/services/contentGenerator.ts', 'utf-8');

// Replace the first prompt (for Gemini)
content = content.replace(
  /const imagePrompt = `A highly realistic, photorealistic, cinematic 4k stock photography of: \$\{queryString\}\. Do NOT include any text, letters, or illustrations\.`;/,
  `const shortTitle = (articleData.title || queryString).split(':').length > 1 ? (articleData.title || queryString).split(':')[0] : (articleData.title || queryString);
          const imagePrompt = \`A professional, high-end tech blog cover image about "\${shortTitle}". Cinematic lighting, sleek dark modern aesthetic with subtle red glowing accents. The image MUST include prominent, bold, highly legible text overlay that perfectly spells EXACTLY: "\${shortTitle}". Typography should be clean, large, and centered like a YouTube thumbnail or Medium header. 8k, photorealistic, masterpiece.\`;`
);

// Replace the second prompt (fallback)
content = content.replace(
  /const imagePrompt = `A highly realistic, photorealistic, cinematic 4k stock photography of: \$\{queryString\}\. Do NOT include any text, letters, or illustrations\.`;/,
  `const shortTitle = queryString.split(':').length > 1 ? queryString.split(':')[0] : queryString;
    const imagePrompt = \`A professional, high-end tech blog cover image about "\${shortTitle}". Cinematic lighting, sleek dark modern aesthetic with subtle red glowing accents. The image MUST include prominent, bold, highly legible text overlay that perfectly spells EXACTLY: "\${shortTitle}". Typography should be clean, large, and centered like a YouTube thumbnail or Medium header. 8k, photorealistic, masterpiece.\`;`
);

fs.writeFileSync('src/services/contentGenerator.ts', content, 'utf-8');
console.log('Patched prompts');
