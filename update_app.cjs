const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Ensure /privacy is accessible as a root path
const rootPrivacyRoute = `        <Route path="/privacy" element={<PrivacyPolicy />} />\n`;
if (!content.includes('path="/privacy"')) {
    content = content.replace('{/* Catch-all redirect mapped to default language */}', rootPrivacyRoute + '        {/* Catch-all redirect mapped to default language */}');
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Updated App.tsx");
