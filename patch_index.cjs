const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Replace skel-nav with actual links
const skelNavTarget = `<div class="skel-nav">
          <div class="skel-nav-item"></div>
          <div class="skel-nav-item"></div>
          <div class="skel-nav-item"></div>
        </div>`;

const skelNavReplacement = `<nav class="skel-nav" aria-label="Main Navigation">
          <a href="/" style="color: white; text-decoration: none;">Home</a>
          <a href="/en/blog" style="color: white; text-decoration: none;">Blog</a>
          <a href="/sitemap" style="color: white; text-decoration: none;">Sitemap</a>
        </nav>`;

code = code.replace(skelNavTarget, skelNavReplacement);

// Remove the aggressive hiding of SEO content, just use sr-only or simple display: none
// Ahrefs might penalize clip: rect(0,0,0,0)
const seoStyleTarget = `style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;"`;
const seoStyleReplacement = `style="display: none;"`;

code = code.replace(seoStyleTarget, seoStyleReplacement);

fs.writeFileSync('index.html', code);
console.log('index.html patched');
