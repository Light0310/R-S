const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// For features cards
content = content.replace(/class="feature-card"/g, 'class="feature-card border border-gray-800 bg-gradient-to-b from-gray-900 to-black shadow-lg rounded-xl"');

// For devices cards
content = content.replace(/class="device-card"/g, 'class="device-card border border-gray-800 bg-gradient-to-b from-gray-900 to-black shadow-lg rounded-xl"');

// Let's make sure Pricing Cards also look premium and have appropriate spacing
content = content.replace(/class="pricing-card"/g, 'class="pricing-card border border-gray-800 bg-gradient-to-b from-gray-900 to-black shadow-lg rounded-xl relative"');
// Wait, for 12 months, we already set: class="pricing-card popular scale-105 transform z-10 border border-[#e50914]/50 shadow-[0_10px_30px_rgba(229,9,20,0.2)] relative"
// I will just add the background gradient to it
content = content.replace(/class="pricing-card popular scale-105 transform/g, 'class="pricing-card popular scale-105 transform bg-gradient-to-b from-gray-900 to-black');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
