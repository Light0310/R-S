const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Replace mobile display: none with something SEO friendly
code = code.replace('.skel-nav { display: none; }', '.skel-nav { opacity: 0; pointer-events: none; }');

// Replace display: none for the main content with SEO-friendly sr-only
const seoStyleTarget = `style="display: none;"`;
const seoStyleReplacement = `style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; white-space: nowrap; border: 0; opacity: 0.01;"`;

code = code.replace(seoStyleTarget, seoStyleReplacement);

fs.writeFileSync('index.html', code);
console.log('index.html SEO patched');
