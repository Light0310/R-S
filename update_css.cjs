const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Fitness Brand Vibe & High Contrast
content = content.replace(/--color-black: #[0-9a-fA-F]+;/g, '--color-black: #000000;');
content = content.replace(/--color-card-bg: #[0-9a-fA-F]+;/g, '--color-card-bg: #0a0a0a;');
content = content.replace(/--color-border: #[0-9a-fA-F]+;/g, '--color-border: #1f1f1f;');
content = content.replace(/--color-primary: #[0-9a-fA-F]+;/g, '--color-primary: #ff0000;');
content = content.replace(/--color-primary-hover: #[0-9a-fA-F]+;/g, '--color-primary-hover: #cc0000;');
content = content.replace(/--color-primary-glow: rgba\([^)]+\);/g, '--color-primary-glow: rgba(255, 0, 0, 0.6);');
content = content.replace(/--color-text-dim: #[0-9a-fA-F]+;/g, '--color-text-dim: #6b7280;');

// 2. Micro-Interactions & 3D Hover Effects
// Add transitions to feature cards and pricing cards if not already there
content = content.replace(
  /\.feature-card \{/g,
  '.feature-card {\n      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;'
);
content = content.replace(
  /\.feature-card:hover \{([^}]+)\}/,
  '.feature-card:hover {  transform: translateY(-5px);  box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 15px rgba(255,0,0,0.1);  border-color: rgba(255,0,0,0.3); }'
);

content = content.replace(
  /\.pricing-card \{([^}]+)\}/,
  '.pricing-card {$1  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;'
);

content = content.replace(
  /\.pricing-card:hover \{([^}]+)\}/,
  '.pricing-card:hover {  transform: translateY(-8px) scale(1.02);  border-color: rgba(255, 0, 0, 0.5);  box-shadow: 0 20px 40px rgba(0,0,0,0.9), 0 0 20px rgba(255, 0, 0, 0.15); }'
);

// Enhance popular card
content = content.replace(
  /\.pricing-card\.popular \{([^}]+)\}/,
  `.pricing-card.popular {$1  transform: scale(1.08) perspective(1000px) translateZ(20px);  box-shadow: 0 15px 30px rgba(0,0,0,0.9), 0 0 40px rgba(255, 0, 0, 0.2);  border: 2px solid #ff0000; z-index: 2;}`
);

content = content.replace(
  /\.pricing-card\.popular:hover \{([^}]+)\}/,
  `.pricing-card.popular:hover {  transform: scale(1.12) translateY(-10px) perspective(1000px) translateZ(30px);  border-color: #ff0000;  box-shadow: 0 25px 50px rgba(0,0,0,0.9), 0 0 60px rgba(255, 0, 0, 0.4); }`
);

fs.writeFileSync('index.html', content, 'utf8');
