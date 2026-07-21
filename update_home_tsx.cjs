const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// Replace standard dropdown styling with Glassmorphism
content = content.replace(
  /backgroundColor: '#141414',\s*color: 'white',/g,
  `backgroundColor: 'rgba(20, 20, 20, 0.6)', backdropFilter: 'blur(10px)', color: 'white',`
);

content = content.replace(
  /backgroundColor: '#141414',\s*padding: '4px',\s*boxShadow: '0 10px 25px -5px rgba\(0, 0, 0, 0\.5\)',/g,
  `backgroundColor: 'rgba(20, 20, 20, 0.8)', backdropFilter: 'blur(15px)', padding: '6px', boxShadow: '0 10px 35px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 0, 0, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)',`
);

content = content.replace(
  /<span>\{languageNames\[currentLang\]\.flag\} \{languageNames\[currentLang\]\.label\}<\/span>/g,
  `<span style={{ fontWeight: 800 }}>{currentLang.toUpperCase()}</span>`
);

content = content.replace(
  /border: '1px solid rgba\(255, 255, 255, 0\.1\)',\s*backgroundColor: 'rgba\(20, 20, 20, 0\.6\)', backdropFilter: 'blur\(10px\)', color: 'white',/g,
  `border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(10, 10, 10, 0.5)', backdropFilter: 'blur(10px)', color: 'white',`
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
