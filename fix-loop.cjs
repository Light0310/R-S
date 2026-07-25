const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace('<Navigate to={`/${lang || "en"}`} replace />', '<Navigate to={`/${lang || "en"}/home`} replace />');
fs.writeFileSync('src/App.tsx', code);
