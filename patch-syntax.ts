import fs from 'fs';
let content = fs.readFileSync('src/services/contentGenerator.ts', 'utf-8');

content = content.replace(
  /base64Image = generateSvgThumbnail\((.*?)\);\n\s*return \{/g,
  `base64Image = generateSvgThumbnail($1);\n        } catch(e) { console.error('SVG Gen Error', e) }\n\n        return {`
);

content = content.replace(
  /fallbackImage = generateSvgThumbnail\((.*?)\);\n\s*return \{/g,
  `fallbackImage = generateSvgThumbnail($1);\n  } catch(e) { console.error('SVG Gen Error', e) }\n\n  return {`
);

fs.writeFileSync('src/services/contentGenerator.ts', content);
