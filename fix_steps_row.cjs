const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const stepsSearch = /<!-- How it Works Section -->[\s\S]*?(?=<div class="pricing-grid")/m;

const stepsReplace = `<!-- How it Works Section -->
      <div class="flex flex-row items-start justify-between md:justify-center w-full max-w-3xl mx-auto" style="font-family: var(--font-sans); margin-top: 40px; margin-bottom: 70px; gap: 10px;">
        
        <div class="flex flex-col items-center text-center flex-1">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-3 shadow-lg text-sm md:text-base">1</div>
          <span class="text-gray-300 font-medium text-[10px] md:text-sm uppercase tracking-wider leading-tight">Choose<br class="md:hidden"/> a Plan</span>
        </div>
        
        <div class="hidden md:flex flex-col justify-center h-12 w-16">
          <div class="w-full h-px bg-gray-700"></div>
        </div>
        
        <div class="flex flex-col items-center text-center flex-1">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-3 shadow-lg text-sm md:text-base">2</div>
          <span class="text-gray-300 font-medium text-[10px] md:text-sm uppercase tracking-wider leading-tight">Get via<br class="md:hidden"/> WhatsApp</span>
        </div>
        
        <div class="hidden md:flex flex-col justify-center h-12 w-16">
          <div class="w-full h-px bg-gray-700"></div>
        </div>
        
        <div class="flex flex-col items-center text-center flex-1">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#e50914] flex items-center justify-center text-white font-bold mb-3 shadow-[0_0_15px_rgba(229,9,20,0.5)] text-sm md:text-base">3</div>
          <span class="text-white font-bold text-[10px] md:text-sm uppercase tracking-wider leading-tight">Start<br class="md:hidden"/> Watching</span>
        </div>
        
      </div>

      `;

content = content.replace(stepsSearch, stepsReplace);
fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log('Fixed steps to row');
