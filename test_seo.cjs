const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace("console.error('Error generating sitemap HTML links', e);", "console.error('Error generating sitemap HTML links', e);\n          seoLinksHtml += '<!-- SEO ERROR -->';");
code = code.replace("res.send(modifiedHtml);", "console.log('Sending SEO HTML, length:', seoLinksHtml.length);\n        res.send(modifiedHtml);");
fs.writeFileSync('server.ts', code);
