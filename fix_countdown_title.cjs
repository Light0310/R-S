const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(
  /<span class="countdown-timer-title">⚡ Special Offer Ends In:<\/span>/g,
  '<span class="countdown-timer-title text-gray-400 font-medium text-sm mb-2" style="text-transform: none; letter-spacing: normal; color: #a3a3a3;">Limited time offer ends in:</span>'
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
