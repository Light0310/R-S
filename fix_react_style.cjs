const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// The simplest way is to manually replace the exact strings I injected, because parsing JSX inline styles dynamically is risky via regex.

// 12 months plan
content = content.replace(
  /style="transform: scale\(1\.05\); z-index: 10; border-color: rgba\(229,9,20,0\.5\); box-shadow: 0 10px 30px rgba\(229,9,20,0\.15\);"/g,
  `style={{ transform: 'scale(1.05)', zIndex: 10, borderColor: 'rgba(229,9,20,0.5)', boxShadow: '0 10px 30px rgba(229,9,20,0.15)' }}`
);

// pricing tag
content = content.replace(
  /style="background: #e50914; color: white; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.1em; position: absolute; top: -12px; left: 50%; transform: translateX\(-50%\); width: max-content; box-shadow: 0 0 15px rgba\(229,9,20,0\.5\);"/g,
  `style={{ background: '#e50914', color: 'white', padding: '4px 12px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', width: 'max-content', boxShadow: '0 0 15px rgba(229,9,20,0.5)' }}`
);

// order 12 months
content = content.replace(
  /style="background: #e50914; color: white; box-shadow: 0 0 20px rgba\(229,9,20,0\.6\);"/g,
  `style={{ background: '#e50914', color: 'white', boxShadow: '0 0 20px rgba(229,9,20,0.6)' }}`
);

// cta-btn at top
content = content.replace(
  /style="box-shadow: 0 0 25px rgba\(229,9,20,0\.6\);"/g,
  `style={{ boxShadow: '0 0 25px rgba(229,9,20,0.6)' }}`
);

// trust signals container
content = content.replace(
  /style="display: flex; justify-content: center; gap: 40px; margin-top: 60px; flex-wrap: wrap; text-align: center; color: #888; font-size: 0\.85rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0\.05em;"/g,
  `style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '60px', flexWrap: 'wrap', textAlign: 'center', color: '#888', fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.05em' }}`
);

// trust signal items
content = content.replace(
  /style="display: flex; align-items: center; gap: 10px; opacity: 0\.7;"/g,
  `style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.7 }}`
);

// trust signal svgs
content = content.replace(
  /style="width: 18px; height: 18px; color: #aaa;"/g,
  `style={{ width: '18px', height: '18px', color: '#aaa' }}`
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
