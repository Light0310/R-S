const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// I need to clean up the duplicate postsRes.rows.forEach
content = content.replace(
  /        postsRes\.rows\.forEach\(\(post: any\) => \{[\s\S]*?\}\);\n/,
  ''
);

fs.writeFileSync('server.ts', content, 'utf8');
