const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(/    \/\/ Exit Intent Modal[\s\S]*?    \}    \/\/ Testimonials slider/m, '    // Testimonials slider');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
