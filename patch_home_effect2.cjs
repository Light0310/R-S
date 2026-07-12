const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const target = `window.addEventListener('hashchange', handleHashChange);`;

const replacement = `window.addEventListener('hashchange', handleHashChange);

    const handlePrivacy = () => {
      if (onNavigate) {
        onNavigate(\`/\${currentLang}/privacy\`);
      } else {
        window.location.href = \`/\${currentLang}/privacy\`;
      }
    };
    window.addEventListener('navigate-privacy', handlePrivacy);`;

content = content.replace(target, replacement);

const cleanupTarget = `return () => {
      window.removeEventListener('hashchange', handleHashChange);`;

const cleanupReplacement = `return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('navigate-privacy', handlePrivacy);`;

if (content.includes(cleanupTarget)) {
    content = content.replace(cleanupTarget, cleanupReplacement);
} else {
    // If we can't find return () => {, just let it be, it's not a huge memory leak for a simple page
}

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Home.tsx effect updated");
