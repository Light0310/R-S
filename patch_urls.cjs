const fs = require('fs');

function fixUrls(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/const baseUrl = "https:\/\/r-s-3lw3\.onrender\.com";/g, 'const baseUrl = "";');
  fs.writeFileSync(filePath, code);
  console.log('Fixed', filePath);
}

fixUrls('src/pages/SecretSeoAdmin.tsx');
fixUrls('src/pages/HtmlSitemap.tsx');
fixUrls('src/App.tsx');
