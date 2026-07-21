const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const stepsSearch = /<!-- How it Works Section -->[\s\S]*?(?=<div class="pricing-grid")/m;

const stepsReplace = `<!-- How it Works Section -->
      <div class="flex flex-col md:flex-row items-center md:items-start justify-center w-full" style="font-family: var(--font-sans); margin-top: 40px; margin-bottom: 70px; gap: 30px;">
        <div class="flex flex-col items-center text-center max-w-[150px]">
          <div class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-3 shadow-lg">1</div>
          <span class="text-gray-300 font-medium text-xs sm:text-sm uppercase tracking-wider">Choose a Plan</span>
        </div>
        <div class="hidden md:flex flex-col justify-center h-12">
          <div class="w-12 h-px bg-gray-700"></div>
        </div>
        <div class="flex flex-col items-center text-center max-w-[150px]">
          <div class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-3 shadow-lg">2</div>
          <span class="text-gray-300 font-medium text-xs sm:text-sm uppercase tracking-wider">Get via WhatsApp</span>
        </div>
        <div class="hidden md:flex flex-col justify-center h-12">
          <div class="w-12 h-px bg-gray-700"></div>
        </div>
        <div class="flex flex-col items-center text-center max-w-[150px]">
          <div class="w-12 h-12 rounded-full bg-[#e50914] flex items-center justify-center text-white font-bold mb-3 shadow-[0_0_20px_rgba(229,9,20,0.5)]">3</div>
          <span class="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">Start Watching</span>
        </div>
      </div>

      `;

content = content.replace(stepsSearch, stepsReplace);
fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log('Fixed steps');
