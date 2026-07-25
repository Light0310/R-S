const fs = require('fs');
let code = fs.readFileSync('src/components/BlogPost.tsx', 'utf8');

const oldReplace = `.replace(/\\/\\[([^\\]]*how modern smart TV boxes are revolutionizing entertainment[^\\]]*)\\]\\([^)]+\\)\\/gi, '$1')
                      .replace(/\\/<(?:a|Link)[^>]*>([^<]*how modern smart TV boxes are revolutionizing entertainment[^<]*)<\\/\\(?:a|Link)>\\/gi, '$1')`;

const newReplace = `.replace(/\\[([^\\]]*(?:how modern smart TV boxes are revolutionizing entertainment|modern smart streaming devices)[^\\]]*)\\]\\([^)]+\\)/gi, '$1')
                      .replace(/<(?:a|Link)[^>]*>([^<]*(?:how modern smart TV boxes are revolutionizing entertainment|modern smart streaming devices)[^<]*)<\\/(?:a|Link)>/gi, '$1')`;

// Use simple string replacement since exact match might be tricky with escaping
code = code.replace(
  /\.replace\(\/\\\[\(\[\^\\\]\]\*how modern smart TV boxes are revolutionizing entertainment\[\^\\\]\]\*\)\\\]\\(\[\^\)\]\+\\\)\/gi, '\$1'\)/g,
  `.replace(/\\[([^\\]]*(?:how modern smart TV boxes are revolutionizing entertainment|modern smart streaming devices)[^\\]]*)\\]\\([^)]+\\)/gi, '$1')`
);
code = code.replace(
  /\.replace\(\/<\(\?:a\|Link\)\[\^>\]\*>\(\[\^<\]\*how modern smart TV boxes are revolutionizing entertainment\[\^<\]\*\)<\\\/\(\?:a\|Link\)>\/gi, '\$1'\)/g,
  `.replace(/<(?:a|Link)[^>]*>([^<]*(?:how modern smart TV boxes are revolutionizing entertainment|modern smart streaming devices)[^<]*)<\\/(?:a|Link)>/gi, '$1')`
);

fs.writeFileSync('src/components/BlogPost.tsx', code);
console.log('BlogPost.tsx patched');
