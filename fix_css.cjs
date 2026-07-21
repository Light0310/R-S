const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Add 3D button styling
content = content.replace(
  /\.cta-btn \{([^}]*)\}/,
  `.cta-btn {$1  border: none;  box-shadow: 0 6px 0 #8b0000, 0 10px 20px rgba(229, 9, 20, 0.5);  transform: translateY(0);  transition: all 0.2s ease;}`
);
content = content.replace(
  /\.cta-btn:hover \{([^}]*)\}/,
  `.cta-btn:hover {  background-color: var(--color-primary-hover);  box-shadow: 0 3px 0 #5e0000, 0 5px 15px rgba(229, 9, 20, 0.5);  transform: translateY(3px);}`
);

content = content.replace(
  /\.cta-btn:active \{\}/,
  `.cta-btn:active {  box-shadow: 0 0 0 #5e0000;  transform: translateY(6px);}`
);

// We need to make sure :active exists or just append it.
if(!content.includes('.cta-btn:active')) {
  content = content.replace('.cta-btn:hover {', '.cta-btn:active {  box-shadow: 0 0 0 #5e0000;  transform: translateY(6px);}\n\n    .cta-btn:hover {');
}

// Same for pricing popular CTA
content = content.replace(
  /\.pricing-card\.popular \.plan-cta \{([^}]*)\}/,
  `.pricing-card.popular .plan-cta {$1  box-shadow: 0 6px 0 #8b0000, 0 10px 20px rgba(229, 9, 20, 0.5);  transform: translateY(0);  transition: all 0.2s ease;}`
);

content = content.replace(
  /\.pricing-card\.popular \.plan-cta:hover \{([^}]*)\}/,
  `.pricing-card.popular .plan-cta:hover {  background-color: var(--color-primary-hover);  box-shadow: 0 3px 0 #5e0000, 0 5px 15px rgba(229, 9, 20, 0.5);  transform: translateY(3px);}`
);

// Add animated border for 12 months plan
content = content.replace(
  /\.pricing-card\.popular \{([^}]*)\}/,
  `.pricing-card.popular {$1  position: relative;  border: 2px solid transparent;  background-clip: padding-box;  border-image: linear-gradient(45deg, #e50914, #ff4500, #e50914) 1;  animation: border-glow 3s linear infinite; } @keyframes border-glow { 0% { border-image-source: linear-gradient(0deg, #e50914, #ff4500, #e50914); } 100% { border-image-source: linear-gradient(360deg, #e50914, #ff4500, #e50914); } }`
);

fs.writeFileSync('index.html', content, 'utf8');
