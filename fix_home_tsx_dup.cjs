const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(
  /border: '1px solid rgba\(255, 255, 255, 0\.1\)',\s*backgroundColor: 'rgba\(20, 20, 20, 0\.8\)', backdropFilter: 'blur\(15px\)', padding: '6px', boxShadow: '0 10px 35px rgba\(0, 0, 0, 0\.8\), 0 0 10px rgba\(255, 0, 0, 0\.1\)', border: '1px solid rgba\(255, 255, 255, 0\.1\)',/g,
  `backgroundColor: 'rgba(20, 20, 20, 0.8)', backdropFilter: 'blur(15px)', padding: '6px', boxShadow: '0 10px 35px rgba(0, 0, 0, 0.9), 0 0 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)',`
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
