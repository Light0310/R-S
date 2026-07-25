const fs = require('fs');
let data = fs.readFileSync('dist/index.html', 'utf8');
let seoLinksHtml = '<div id="sitemap-links">HELLO</div>';
let modifiedHtml = data.replace('</main>', '</main>' + seoLinksHtml);
if (modifiedHtml.includes('sitemap-links')) {
  console.log("REPLACE WORKED!");
} else {
  console.log("REPLACE FAILED!");
  console.log("Index of </main>:", data.indexOf('</main>'));
}
