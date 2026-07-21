const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Remove primary color from headings
content = content.replace(/color: var\(--color-primary\);/g, (match, offset, str) => {
  // Check context if it's a heading
  const preceding = str.substring(Math.max(0, offset - 100), offset);
  if (preceding.includes('.plan-name') || preceding.includes('.stat-number.accent') || preceding.includes('h1 span.highlight')) {
     return 'color: #fff;';
  }
  return match;
});

// Specifically target hero and section headings and descriptions
content = content.replace(
  /\.hero h1 \{[\s\S]*?\}/,
  `.hero h1 {
      font-family: var(--font-display);
      font-size: clamp(40px, 7vw, 75px);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 30px;
      letter-spacing: -0.02em;
      color: #fff;
    }`
);

content = content.replace(
  /\.section-header h2 \{[\s\S]*?\}/,
  `.section-header h2 {
      font-size: clamp(32px, 5vw, 48px);
      font-weight: 800;
      letter-spacing: -0.01em;
      margin-bottom: 24px;
      color: #fff;
    }`
);

content = content.replace(
  /\.section-header p \{[\s\S]*?\}/,
  `.section-header p {
      font-size: 18px;
      color: #9ca3af; /* text-gray-400 */
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }`
);

content = content.replace(
  /\.hero p \{[\s\S]*?\}/,
  `.hero p {
      font-size: clamp(16px, 2vw, 20px);
      color: #9ca3af; /* text-gray-400 */
      max-width: 700px;
      margin: 0 auto 50px;
      line-height: 1.7;
    }`
);

// Check if any description has text-transform: uppercase or font-style: italic
content = content.replace(/font-style:\s*italic;/g, '');
content = content.replace(/text-transform:\s*uppercase;/g, (match, offset, str) => {
  const preceding = str.substring(Math.max(0, offset - 50), offset);
  if (preceding.includes('p {') || preceding.includes('.plan-desc') || preceding.includes('.feature-desc') || preceding.includes('hero p')) {
    return '';
  }
  // Keep uppercase for buttons, plan names, badges
  return match;
});


// Whitespace / spacing: padding between sections
// currently features, devices, pricing have padding: 100px 0;
content = content.replace(/padding:\s*100px\s*0;/g, 'padding: 140px 0;'); // e.g. py-20 is less, but 140px is nice and big

fs.writeFileSync('index.html', content, 'utf8');
console.log("Updated typography and spacing in index.html");
