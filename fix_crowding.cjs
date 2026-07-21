const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// Fix How it works section spacing
const oldHowItWorks = `<div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12" style="font-family: var(--font-sans);">`;
const newHowItWorks = `<div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 w-full" style="font-family: var(--font-sans); margin-top: 40px; margin-bottom: 60px;">`;

content = content.replace(oldHowItWorks, newHowItWorks);

// Let's also make sure the pricing grid has some margin top just in case
content = content.replace(
  `<div class="pricing-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">`,
  `<div class="pricing-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-top: 40px;">`
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log('Fixed crowding');
