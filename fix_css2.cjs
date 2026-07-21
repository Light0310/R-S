const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(
  /transition: transform 0\.4s cubic-bezier\(0\.175, 0\.885, 0\.32, 1\.275\), box-shadow 0\.4s ease;\n\n    \.pricing-card:hover/g,
  'transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;\n    }\n\n    .pricing-card:hover'
);

// Also need to check `.pricing-card.popular`
content = content.replace(
  /\.pricing-card\.popular \{\s*border: 1px solid rgba\(229, 9, 20, 0\.4\);\s*background: linear-gradient\(180deg, #111111 0%, #1a0505 100%\);\s*transform: scale\(1\.05\);\s*box-shadow: 0 8px 30px rgba\(229, 9, 20, 0\.15\);\s*position: relative;\s*border: 2px solid transparent;\s*background-clip: padding-box;\s*border-image: linear-gradient\(45deg, #e50914, #ff4500, #e50914\) 1;\s*animation: border-glow 3s linear infinite;\s*transform: scale\(1\.08\) perspective\(1000px\) translateZ\(20px\);\s*box-shadow: 0 15px 30px rgba\(0,0,0,0\.9\), 0 0 40px rgba\(255, 0, 0, 0\.2\);\s*border: 2px solid #ff0000; z-index: 2;\}\s*@keyframes border-glow/g,
  `.pricing-card.popular {
      background: linear-gradient(180deg, #111111 0%, #1a0505 100%);
      position: relative;
      border: 2px solid transparent;
      background-clip: padding-box;
      border-image: linear-gradient(45deg, #e50914, #ff4500, #e50914) 1;
      animation: border-glow 3s linear infinite; 
      transform: scale(1.08) perspective(1000px) translateZ(20px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.9), 0 0 40px rgba(255, 0, 0, 0.2);
      z-index: 2;
    } 
    @keyframes border-glow`
);

fs.writeFileSync('index.html', content, 'utf8');
