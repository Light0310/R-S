const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
  /<div\s+onClick=\{\(\) => handleNavigate\('home'\)\}\s+className="flex items-center gap-2 cursor-pointer select-none"\s*>/g,
  '<Link to={`/${currentLang}`} className="flex items-center gap-2 cursor-pointer select-none">'
);
code = code.replace(
  /<\/div>\s*\{\/\* Navigation Center Links \*\/\}/,
  '</Link>\n          {/* Navigation Center Links */}'
);
fs.writeFileSync('src/App.tsx', code);
