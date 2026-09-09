const fs = require('fs');
const data = require('./src/content/dynamic_posts.json');
const filtered = data.filter(p => p.id !== 'best-sports-iptv');
fs.writeFileSync('./src/content/dynamic_posts.json', JSON.stringify(filtered, null, 2));
