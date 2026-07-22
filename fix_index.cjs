const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const replacement = `
    .whatsapp-floating {
      position: fixed;
      bottom: 25px;
      right: 25px;
      background-color: #25d366;
      color: #ffffff;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
      z-index: 10000;
      transition: var(--transition-smooth);
      text-decoration: none;
    }

    .whatsapp-floating:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
    }

    .whatsapp-floating svg {
      width: 34px !important;
      height: 34px !important;
      fill: currentColor;
      display: block;
      margin: 0;
      padding: 0;
    }

    .whatsapp-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #25d366;
      border-radius: 50%;
      z-index: -1;
      animation: whatsapp-glow 2s infinite;
    }
`;

content = content.replace(/\/\* Floating WhatsApp Widget \*\/[\s\S]*?\.whatsapp-pulse \{[\s\S]*?\}/, '/* Floating WhatsApp Widget */' + replacement);

content = content.replace(/\.whatsapp-floating svg \{[\s\S]*?\}/g, (match) => {
    if (match.includes('width: 26px;')) {
        return `.whatsapp-floating svg { width: 30px !important; height: 30px !important; }`;
    }
    return match;
});

fs.writeFileSync('index.html', content, 'utf8');
console.log("Index CSS fixed.");
