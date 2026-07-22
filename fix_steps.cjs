const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const searchRegex = /<!-- How it Works Section -->[\s\S]*?<\/div>\s*<\/div>\s*<div class="pricing-grid"/;

const replacement = `<!-- How it Works Section -->
      <div class="flex flex-row items-start justify-center w-full max-w-2xl mx-auto" style="font-family: var(--font-sans); margin-top: 40px; margin-bottom: 70px;">
        
        <div class="flex flex-col items-center text-center w-28 md:w-32 relative">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-3 shadow-lg text-sm md:text-base z-10 relative">1</div>
          <span class="text-gray-300 font-medium text-[10px] md:text-xs uppercase tracking-wider leading-tight">Choose<br class="md:hidden"/> a Plan</span>
          <!-- Divider Line -->
          <div class="hidden md:block absolute top-[23px] left-[50%] w-full h-px bg-gray-700 z-0"></div>
        </div>

        <div class="flex flex-col items-center text-center w-28 md:w-32 relative">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-3 shadow-lg text-sm md:text-base z-10 relative">2</div>
          <span class="text-gray-300 font-medium text-[10px] md:text-xs uppercase tracking-wider leading-tight">Get via<br class="md:hidden"/> WhatsApp</span>
          <!-- Divider Line -->
          <div class="hidden md:block absolute top-[23px] left-[50%] w-full h-px bg-gray-700 z-0"></div>
        </div>

        <div class="flex flex-col items-center text-center w-28 md:w-32 relative">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#e50914] flex items-center justify-center text-white font-bold mb-3 shadow-[0_0_15px_rgba(229,9,20,0.5)] text-sm md:text-base z-10 relative">3</div>
          <span class="text-white font-bold text-[10px] md:text-xs uppercase tracking-wider leading-tight">Start<br class="md:hidden"/> Watching</span>
        </div>
        
      </div>

      <div class="pricing-grid"`;

content = content.replace(searchRegex, replacement);
fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Steps fixed.");
