const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

if (!content.includes("import DownloaderCodes")) {
    content = content.replace("import FAQSection", "import FAQSection from './FAQSection';\nimport DownloaderCodes from './DownloaderCodes';\nimport { useGeoLocation } from '../hooks/useGeoLocation';");
}

const targetHtml = `<div dangerouslySetInnerHTML={{ __html: getTranslatedLandingHTML(LANDING_HTML_TOP, currentLang) }} />`;
const replacementHtml = `<div dangerouslySetInnerHTML={{ __html: getTranslatedLandingHTML(LANDING_HTML_TOP, currentLang) }} />\n      <DownloaderCodes />`;

if (!content.includes("<DownloaderCodes />")) {
    content = content.replace(targetHtml, replacementHtml);
}

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Home updated with DownloaderCodes");
