const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// The icons in the features section are inside <div class="feature-icon-wrapper">
// we can inject width="32" height="32" into all those svgs
content = content.replace(/<div class="feature-icon-wrapper">\s*<!--.*?-->\s*<svg/g, match => {
  return match + ' width="32" height="32" style="width: 32px; height: 32px;"';
});

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
