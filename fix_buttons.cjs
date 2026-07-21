const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(
  /class="plan-cta"\s+id="btn-1month-order"/g,
  'class="plan-cta bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition-colors" id="btn-1month-order"'
);

content = content.replace(
  /class="plan-cta"\s+id="btn-6months-order"/g,
  'class="plan-cta bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition-colors" id="btn-6months-order"'
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
