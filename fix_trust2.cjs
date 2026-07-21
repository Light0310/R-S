const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const minimalTrustBadges = `
      <div class="pricing-trust-signals" style="display: flex; justify-content: center; gap: 40px; margin-top: 60px; flex-wrap: wrap; text-align: center; color: #888; font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.05em;">
        <div style="display: flex; align-items: center; gap: 10px; opacity: 0.7;">
          <svg style="width: 18px; height: 18px; color: #aaa;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          <span>Anti-Freeze Technology</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; opacity: 0.7;">
          <svg style="width: 18px; height: 18px; color: #aaa;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <span>99.9% Uptime Server</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; opacity: 0.7;">
          <svg style="width: 18px; height: 18px; color: #aaa;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>
`;

content = content.replace(
  /<div class="pricing-trust-signals".*?<\/div>\s*<\/div>\s*<\/div>/s,
  minimalTrustBadges
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Updated Trust Badges to Minimalist");
