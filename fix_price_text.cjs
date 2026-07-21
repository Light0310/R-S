const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// 6 Months fix
const plan6Search = `<div class="plan-price-wrapper">
              <span class="plan-price">39.00</span>
              <span class="plan-currency">€</span>
              <span class="plan-duration">/6 Months</span>
            </div>
            <p class="plan-desc text-gray-400 font-normal normal-case not-italic">Our highly popular plan. Ideal for keeping up with sports season.</p>`;

const plan6Replace = `<div class="plan-price-wrapper" style="margin-bottom: 4px;">
              <span class="plan-price">39.00</span>
              <span class="plan-currency">€</span>
              <span class="plan-duration">/6 Months</span>
            </div>
            <div class="text-[11px] text-gray-400/80 font-medium tracking-wide uppercase mb-3">Equals 6.50€ / mo</div>
            <p class="plan-desc text-gray-400 font-normal normal-case not-italic">Our highly popular plan. Ideal for keeping up with sports season.</p>`;

content = content.replace(plan6Search, plan6Replace);

// 12 Months fix
const plan12Search = `<div class="flex flex-col items-center justify-center my-4">
              <span class="text-gray-500 line-through text-lg font-medium mb-1">79.00 €</span>
              <div class="flex items-baseline text-[#e50914]">
                <span class="plan-price text-[#e50914]">49.00</span>
                <span class="plan-currency text-[#e50914]">€</span>
                <span class="plan-duration text-gray-400">/Year</span>
              </div>
            </div>
            <p class="plan-desc text-gray-400 font-normal normal-case not-italic">Ultimate premium package. Only 10€ more than 6 months!</p>`;

const plan12Replace = `<div class="flex flex-col items-center justify-center mt-4 mb-2">
              <span class="text-gray-500 line-through text-lg font-medium mb-1">79.00 €</span>
              <div class="flex items-baseline text-[#e50914]">
                <span class="plan-price text-[#e50914]">49.00</span>
                <span class="plan-currency text-[#e50914]">€</span>
                <span class="plan-duration text-gray-400">/Year</span>
              </div>
            </div>
            <div class="text-[11px] text-[#e50914]/80 font-medium tracking-wide uppercase mb-3">Equals 4.08€ / mo</div>
            <p class="plan-desc text-gray-400 font-normal normal-case not-italic">Ultimate premium package. Only 10€ more than 6 months!</p>`;

content = content.replace(plan12Search, plan12Replace);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Price equivalent text added.");
