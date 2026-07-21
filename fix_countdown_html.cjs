const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Also fix index.html just in case there is hardcoded text there
content = content.replace(
  /<span class="countdown-timer-title">⚡ Special Offer Ends In:<\/span>/g,
  '<span class="countdown-timer-title" style="color: #a3a3a3; font-weight: 500; font-size: 0.85rem; letter-spacing: normal; text-transform: none;">Limited time offer ends in:</span>'
);

fs.writeFileSync('index.html', content, 'utf8');
