const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const topIdx = content.indexOf('const LANDING_HTML_TOP = `');
if (topIdx !== -1) {
  let before = content.substring(0, topIdx);
  let after = content.substring(topIdx);
  
  after = after.replace(/strokeWidth/g, 'stroke-width');
  after = after.replace(/strokeLinecap/g, 'stroke-linecap');
  after = after.replace(/strokeLinejoin/g, 'stroke-linejoin');
  
  content = before + after;
  fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
}
