const fs = require('fs');
let content = fs.readFileSync('src/components/PrivacyPolicy.tsx', 'utf8');

content = content.replace("import { validLanguages, Language } from '../types';", "import { Language } from '../types';\nconst validLanguages: Language[] = ['en', 'ar', 'es', 'nl', 'fr', 'ru', 'de'];");

fs.writeFileSync('src/components/PrivacyPolicy.tsx', content, 'utf8');
console.log("Fixed PrivacyPolicy.tsx");
