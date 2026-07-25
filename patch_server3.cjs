const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const target = `        // If AhrefsBot or user visits /sitemap, we inject ALL blog post links into the HTML
        // so crawlers can discover every single page.
        if (req.path === '/sitemap' || req.path === '/sitemap/') {`;

const replacement = `        // If AhrefsBot or user visits /sitemap OR the blog index, we inject ALL blog post links into the HTML
        // so crawlers can discover every single page.
        if (req.path === '/sitemap' || req.path === '/sitemap/' || req.path.includes('/blog')) {`;

code = code.replace(target, replacement);
fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts');
