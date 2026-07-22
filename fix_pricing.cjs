const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const searchRegex = /<div class="pricing-grid" style="grid-template-columns: repeat\(auto-fit, minmax\(300px, 1fr\)\); gap: 40px; margin-top: 40px;">/;
const replacement = `<div class="flex flex-wrap justify-center gap-8 md:gap-10 mt-10 max-w-4xl mx-auto">`;

content = content.replace(searchRegex, replacement);

// Replace pricing-card classes to include flex and width
content = content.replace(
  /<div class="pricing-card border border-gray-800/g,
  '<div class="pricing-card w-full sm:w-[calc(50%-16px)] md:w-[calc(50%-20px)] max-w-[380px] flex flex-col border border-gray-800'
);

// Specifically for the 12 month card (has different classes)
content = content.replace(
  /<div class="pricing-card popular scale-105 transform/g,
  '<div class="pricing-card popular w-full sm:w-[calc(50%-16px)] md:w-[calc(50%-20px)] max-w-[380px] flex flex-col scale-105 transform'
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Pricing flex layout applied.");
