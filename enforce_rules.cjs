const fs = require('fs');

// 1. Home.tsx changes
let home = fs.readFileSync('src/components/Home.tsx', 'utf8');

// For 12 months plan card
// Replace class="pricing-card popular" with style="transform: scale(1.05); z-index: 10; border: 1px solid rgba(229,9,20,0.5); box-shadow: 0 0 30px rgba(229,9,20,0.15);"
home = home.replace(
  /<div class="pricing-card popular" id="plan-12months"[\s\S]*?>/g,
  `<div class="pricing-card popular scale-105 z-10" id="plan-12months" style="transform: scale(1.05); z-index: 10; border-color: rgba(229,9,20,0.5); box-shadow: 0 10px 30px rgba(229,9,20,0.15);">`
);

// Make sure the badge is clean and absolute
home = home.replace(
  /<div class="pricing-tag" style="background: #e50914; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; position: absolute; top: -15px; left: 50%; transform: translateX\(-50%\); width: max-content;">.*?<\/div>/g,
  `<div class="pricing-tag" style="background: #e50914; color: white; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: max-content; box-shadow: 0 0 15px rgba(229,9,20,0.5);">BEST VALUE</div>`
);

// Ensure the CTA button glows
home = home.replace(
  /class="plan-cta" style="background: #e50914; color: white;"/g,
  `class="plan-cta" style="background: #e50914; color: white; box-shadow: 0 0 20px rgba(229,9,20,0.6);"`
);
// ensure big cta at top glows
home = home.replace(
  /class="cta-btn"/g,
  `class="cta-btn" style="box-shadow: 0 0 25px rgba(229,9,20,0.6);"`
);

fs.writeFileSync('src/components/Home.tsx', home, 'utf8');

// 2. index.html changes
let css = fs.readFileSync('index.html', 'utf8');

// Remove uppercase from descriptions
css = css.replace(/\.plan-desc \{[\s\S]*?\}/g, `.plan-desc { font-size: 14px; color: #9ca3af; margin-bottom: 24px; line-height: 1.6; }`);
css = css.replace(/\.feature-desc \{[\s\S]*?\}/g, `.feature-desc { font-size: 14px; color: #9ca3af; line-height: 1.6; }`);

// Remove italic and uppercase from h1, h2, h3, h4 global styles if any
css = css.replace(/h1, h2, h3, h4 \{[\s\S]*?\}/g, `h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em; color: #ffffff; }`);

// Make sure hero h1 has no italic
css = css.replace(/font-style:\s*italic;/g, '');

// Clean up plan name red color (remove --color-primary from .plan-name if it exists)
css = css.replace(/\.pricing-card\.popular \.plan-name \{\s*color: var\(--color-primary\);\s*\}/g, ``);

// Ensure whitespace between sections
css = css.replace(/padding:\s*140px\s*0;/g, 'padding: 160px 0;'); // py-20 equivalent roughly
css = css.replace(/padding:\s*60px\s*0;/g, 'padding: 120px 0;');

fs.writeFileSync('index.html', css, 'utf8');

console.log("Applied UI fixes");
