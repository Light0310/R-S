import fs from 'fs';

const newPromptStr = "`A futuristic, ultra high-tech blog cover image. The image MUST prominently feature the exact text: \\\"${shortTitle}\\\". The text must be large, glowing, perfectly legible, and centered. The background should be a highly advanced tech environment, featuring glowing neon circuits, fiber optics, sleek server racks, or holographic data streams in a dark cinematic aesthetic. 8k, masterpiece, photorealistic, cyberpunk tech vibe.`";

// Update seoRoutes.ts
let routesContent = fs.readFileSync('src/routes/seoRoutes.ts', 'utf-8');
routesContent = routesContent.replace(/const imagePrompt = `[^`]+`;/, 'const imagePrompt = ' + newPromptStr + ';');
fs.writeFileSync('src/routes/seoRoutes.ts', routesContent);
console.log('Updated seoRoutes.ts');

// Update contentGenerator.ts
let generatorContent = fs.readFileSync('src/services/contentGenerator.ts', 'utf-8');
generatorContent = generatorContent.replace(/const imagePrompt = `[^`]+`;/g, 'const imagePrompt = ' + newPromptStr + ';');
fs.writeFileSync('src/services/contentGenerator.ts', generatorContent);
console.log('Updated contentGenerator.ts');
