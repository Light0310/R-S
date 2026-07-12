const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const effectTarget = `    const handlePrivacy = () => {
      if (onNavigate) {
        onNavigate(\`/\${currentLang}/privacy\`);
      } else {
        window.location.href = \`/\${currentLang}/privacy\`;
      }
    };
    window.addEventListener('navigate-privacy', handlePrivacy);`;

content = content.replace(effectTarget, '');

const cleanupTarget = `window.removeEventListener('navigate-privacy', handlePrivacy);`;
content = content.replace(cleanupTarget, '');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Cleaned up navigate-privacy from Home.tsx");
