const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// Fix 1 month
content = content.replace(
  /<span class="plan-price">12<\/span>/g,
  '<span class="plan-price">12.00</span>'
);

// Fix 6 months
content = content.replace(
  /<span class="plan-price">39<\/span>/g,
  '<span class="plan-price">39.00</span>'
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
