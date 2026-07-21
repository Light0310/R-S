const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(
  /style="border: 2px solid #e50914; box-shadow: 0 0 20px rgba\(229, 9, 20, 0\.4\); transform: scale\(1\.05\);"/g,
  ''
);

// We should also add Trust Signals under the pricing grid.
// First let's find the closing tag of pricing-grid
const trustBadgesHTML = `
      <div class="pricing-trust-signals" style="display: flex; justify-content: center; gap: 30px; margin-top: 40px; flex-wrap: wrap; text-align: center; color: #aaa; font-size: 0.9rem;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg style="width: 24px; height: 24px; color: #22c55e;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          <span>Secure WhatsApp Ordering</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg style="width: 24px; height: 24px; color: #e50914;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          <span>7-Day Money-Back Guarantee</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg style="width: 24px; height: 24px; color: #3b82f6;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          <span>24/7 Premium Support</span>
        </div>
      </div>
`;

content = content.replace(
  /(<\/div>\s*)(<\/section>\s*<!-- FAQ Section -->)/,
  `$1${trustBadgesHTML}$2`
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Updated Home.tsx inline styles and trust signals");
