const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// Revert 12 months plan
content = content.replace(
  /style=\{\{\s*transform:\s*'scale\(1\.05\)',\s*zIndex:\s*10,\s*borderColor:\s*'rgba\(229,9,20,0\.5\)',\s*boxShadow:\s*'0 10px 30px rgba\(229,9,20,0\.15\)'\s*\}\}/g,
  `style="transform: scale(1.05); z-index: 10; border-color: rgba(229,9,20,0.5); box-shadow: 0 10px 30px rgba(229,9,20,0.15);"`
);

// pricing tag
content = content.replace(
  /style=\{\{\s*background:\s*'#e50914',\s*color:\s*'white',\s*padding:\s*'4px 12px',\s*borderRadius:\s*'9999px',\s*fontWeight:\s*700,\s*fontSize:\s*'0\.75rem',\s*textTransform:\s*'uppercase',\s*letterSpacing:\s*'0\.1em',\s*position:\s*'absolute',\s*top:\s*'-12px',\s*left:\s*'50%',\s*transform:\s*'translateX\(-50%\)',\s*width:\s*'max-content',\s*boxShadow:\s*'0 0 15px rgba\(229,9,20,0\.5\)'\s*\}\}/g,
  `style="background: #e50914; color: white; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: max-content; box-shadow: 0 0 15px rgba(229,9,20,0.5);"`
);

// order 12 months
content = content.replace(
  /style=\{\{\s*background:\s*'#e50914',\s*color:\s*'white',\s*boxShadow:\s*'0 0 20px rgba\(229,9,20,0\.6\)'\s*\}\}/g,
  `style="background: #e50914; color: white; box-shadow: 0 0 20px rgba(229,9,20,0.6);"`
);

// cta-btn at top
content = content.replace(
  /style=\{\{\s*boxShadow:\s*'0 0 25px rgba\(229,9,20,0\.6\)'\s*\}\}/g,
  `style="box-shadow: 0 0 25px rgba(229,9,20,0.6);"`
);

// trust signals container
content = content.replace(
  /style=\{\{\s*display:\s*'flex',\s*justifyContent:\s*'center',\s*gap:\s*'40px',\s*marginTop:\s*'60px',\s*flexWrap:\s*'wrap',\s*textAlign:\s*'center',\s*color:\s*'#888',\s*fontSize:\s*'0\.85rem',\s*fontFamily:\s*"'JetBrains Mono', monospace",\s*textTransform:\s*'uppercase',\s*letterSpacing:\s*'0\.05em'\s*\}\}/g,
  `style="display: flex; justify-content: center; gap: 40px; margin-top: 60px; flex-wrap: wrap; text-align: center; color: #888; font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.05em;"`
);

// trust signal items
content = content.replace(
  /style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*gap:\s*'10px',\s*opacity:\s*0\.7\s*\}\}/g,
  `style="display: flex; align-items: center; gap: 10px; opacity: 0.7;"`
);

// trust signal svgs
content = content.replace(
  /style=\{\{\s*width:\s*'18px',\s*height:\s*'18px',\s*color:\s*'#aaa'\s*\}\}/g,
  `style="width: 18px; height: 18px; color: #aaa;"`
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
