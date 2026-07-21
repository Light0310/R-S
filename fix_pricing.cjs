const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// 1. Add "How it Works" section above pricing grid
const pricingGridSearch = `<div class="pricing-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">`;
const howItWorksInsert = `<!-- How it Works Section -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12" style="font-family: var(--font-sans);">
        <div class="flex flex-col items-center text-center">
          <div class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-2">1</div>
          <span class="text-gray-300 font-medium text-sm uppercase tracking-wide">Choose a Plan</span>
        </div>
        <div class="hidden md:block w-12 h-px bg-gray-700"></div>
        <div class="flex flex-col items-center text-center">
          <div class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-2">2</div>
          <span class="text-gray-300 font-medium text-sm uppercase tracking-wide">Get via WhatsApp</span>
        </div>
        <div class="hidden md:block w-12 h-px bg-gray-700"></div>
        <div class="flex flex-col items-center text-center">
          <div class="w-10 h-10 rounded-full bg-[#e50914] flex items-center justify-center text-white font-bold mb-2 shadow-[0_0_15px_rgba(229,9,20,0.4)]">3</div>
          <span class="text-white font-semibold text-sm uppercase tracking-wide">Start Watching</span>
        </div>
      </div>

      <div class="pricing-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">`;

content = content.replace(pricingGridSearch, howItWorksInsert);

// 2. Update 12 Months plan (price and badge)
const plan12Search = `<div class="pricing-tag" style="background: #e50914; color: white; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: max-content; box-shadow: 0 0 15px rgba(229,9,20,0.5);">BEST VALUE</div>
          <div class="plan-header">
            <h3 class="plan-name">12 Months</h3>
            <div class="plan-price-wrapper">
              <span class="plan-price">49</span>
              <span class="plan-currency">€</span>
              <span class="plan-duration">/Year</span>
            </div>`;

const plan12Replace = `<div class="pricing-tag" style="background: #e50914; color: white; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: max-content; box-shadow: 0 0 15px rgba(229,9,20,0.5);">Launch Offer</div>
          <div class="plan-header">
            <h3 class="plan-name">12 Months</h3>
            <div class="flex flex-col items-center justify-center my-4">
              <span class="text-gray-500 line-through text-lg font-medium mb-1">79.00 €</span>
              <div class="flex items-baseline text-[#e50914]">
                <span class="plan-price text-[#e50914]">49.00</span>
                <span class="plan-currency text-[#e50914]">€</span>
                <span class="plan-duration text-gray-400">/Year</span>
              </div>
            </div>`;

content = content.replace(plan12Search, plan12Replace);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Done");
