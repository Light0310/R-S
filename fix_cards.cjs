const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// For feature-card
content = content.replace(
  /\.feature-card \{\s*transition:[^}]*\}/g,
  `.feature-card {
      background: linear-gradient(180deg, #111111 0%, #000000 100%);
      border: 1px solid #1f2937; /* gray-800 */
      padding: 40px 30px;
      border-radius: 12px;
      position: relative;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    }`
);

// For device-card
content = content.replace(
  /\.device-card \{[\s\S]*?\}/,
  `.device-card {
      background: linear-gradient(180deg, #111111 0%, #000000 100%);
      border: 1px solid #1f2937; /* gray-800 */
      padding: 30px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
    }`
);

// devices hover
content = content.replace(
  /\.device-card:hover \{[\s\S]*?\}/,
  `.device-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 15px rgba(255,0,0,0.1);
      border-color: rgba(255,0,0,0.3);
    }`
);

// And the Whitespace & Margins in Hero Section
// Reduce red text and red glow in Hero
content = content.replace(
  /\.hero h1 span\.highlight \{[\s\S]*?\}/,
  `.hero h1 span.highlight {
      color: #fff;
    }`
);

// increase hero margin
content = content.replace(
  /\.hero \{[\s\S]*?\}/,
  `.hero {
      padding: 180px 0 100px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }`
);

content = content.replace(
  /\.hero h1 \{[\s\S]*?\}/,
  `.hero h1 {
      font-family: var(--font-display);
      font-size: clamp(40px, 7vw, 75px);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 30px;
      letter-spacing: -0.02em;
    }`
);

content = content.replace(
  /\.hero p \{[\s\S]*?\}/,
  `.hero p {
      font-size: clamp(16px, 2vw, 20px);
      color: var(--color-text-gray);
      max-width: 700px;
      margin: 0 auto 50px;
      line-height: 1.7;
    }`
);


fs.writeFileSync('index.html', content, 'utf8');
console.log("Updated CSS");
