const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const target = `window.addEventListener('hashchange', handleHashChange);
    
    // Check hash on mount
    handleHashChange();`;

const replacement = `window.addEventListener('hashchange', handleHashChange);
    
    const handlePrivacy = () => {
      if (onNavigate) {
        onNavigate(\`/\${currentLang}/privacy\`);
      } else {
        window.location.href = \`/\${currentLang}/privacy\`;
      }
    };
    window.addEventListener('navigate-privacy', handlePrivacy);
    
    // Check hash on mount
    handleHashChange();`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    
    // Cleanup
    const targetCleanup = `window.removeEventListener('hashchange', handleHashChange);`;
    const replacementCleanup = `window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('navigate-privacy', handlePrivacy);`;
    content = content.replace(targetCleanup, replacementCleanup);
    
    fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
    console.log("Home.tsx effect updated");
} else {
    console.log("Could not find target in Home.tsx");
}
