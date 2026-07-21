const fs = require('fs');
let css = fs.readFileSync('index.html', 'utf8');

// Remove static padding from sections so Tailwind py-16/py-24 works
css = css.replace(/padding:\s*1[0-9]{2}px\s*0;/g, ''); 
css = css.replace(/\.hero \{[\s\S]*?padding:\s*[^;]+;/g, '.hero {\n      text-align: center;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      position: relative;');

// Remove background and border from cards so Tailwind works
css = css.replace(/background:\s*linear-gradient[^;]+;\s*border:\s*1px solid #[0-9a-fA-F]+;/g, '');

// Also, the 12 month card scale-105: let's make sure it's not overridden
css = css.replace(/transform:\s*scale\(1\.05\);/g, '');

// Restore hero h1 whitespace
css = css.replace(/\.hero h1 \{[\s\S]*?\}/, `.hero h1 { font-family: var(--font-display); font-size: clamp(36px, 6vw, 64px); font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: #ffffff; }`);

fs.writeFileSync('index.html', css, 'utf8');
console.log("Cleaned CSS conflicts");
