const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// remove .trust-badges-row block
content = content.replace(/\.trust-badges-row \{[\s\S]*?\.trust-badge-icon \{[\s\S]*?\}/g, '');

// remove .stats-row block
content = content.replace(/\.stats-row \{[\s\S]*?\.stat-label \{[\s\S]*?\}/g, '');

fs.writeFileSync('index.html', content, 'utf8');
