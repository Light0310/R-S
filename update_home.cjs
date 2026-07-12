const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// 1. Import PrivacyPolicy
if (!content.includes("import PrivacyPolicy")) {
    content = content.replace("import FAQSection from './FAQSection';", "import FAQSection from './FAQSection';\nimport PrivacyPolicy from './PrivacyPolicy';");
}

// 2. Add PrivacyPolicy component before the footer
const targetRender = `<div dangerouslySetInnerHTML={{ __html: getTranslatedLandingHTML(LANDING_HTML_BOTTOM, currentLang) }} />`;
const replacementRender = `<PrivacyPolicy />\n      <div dangerouslySetInnerHTML={{ __html: getTranslatedLandingHTML(LANDING_HTML_BOTTOM, currentLang) }} />`;
if (content.includes(targetRender) && !content.includes("<PrivacyPolicy />")) {
    content = content.replace(targetRender, replacementRender);
}

// 3. Update the footer link in LANDING_HTML_BOTTOM
const oldLink = `<li><a href="/en/privacy" onclick="event.preventDefault(); window.dispatchEvent(new CustomEvent('navigate-privacy'))" class="privacy-link">Privacy Policy</a></li>`;
const newLink = `<li><a href="#privacy">Privacy Policy</a></li>`;
content = content.replace(oldLink, newLink);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Updated Home.tsx");
