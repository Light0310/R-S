const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const searchRegex = /<!-- Conversion Countdown Timer -->[\s\S]*?<div class="hero-cta-wrapper">/;

const replacement = `<!-- Conversion Countdown Timer -->
    <div class="flex flex-col items-center justify-center bg-[#111] border border-white/5 rounded-2xl p-5 mb-8 max-w-sm mx-auto shadow-lg" id="countdown-timer-box">
      <span class="text-gray-400 font-medium text-sm mb-4">Limited time offer ends in:</span>
      <div class="flex items-start gap-2 sm:gap-4" dir="ltr">
        
        <div class="flex flex-col items-center w-14 sm:w-16">
          <span class="font-mono text-xl sm:text-2xl font-medium text-white bg-[#1a1a1a] rounded-lg w-full h-12 flex items-center justify-center border border-white/10" id="cd-val-d">00</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider mt-2 font-medium">Days</span>
        </div>
        
        <span class="text-gray-600 font-bold text-lg sm:text-xl mt-2">:</span>
        
        <div class="flex flex-col items-center w-14 sm:w-16">
          <span class="font-mono text-xl sm:text-2xl font-medium text-white bg-[#1a1a1a] rounded-lg w-full h-12 flex items-center justify-center border border-white/10" id="cd-val-h">00</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider mt-2 font-medium">Hours</span>
        </div>
        
        <span class="text-gray-600 font-bold text-lg sm:text-xl mt-2">:</span>
        
        <div class="flex flex-col items-center w-14 sm:w-16">
          <span class="font-mono text-xl sm:text-2xl font-medium text-white bg-[#1a1a1a] rounded-lg w-full h-12 flex items-center justify-center border border-white/10" id="cd-val-m">00</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider mt-2 font-medium">Mins</span>
        </div>
        
        <span class="text-gray-600 font-bold text-lg sm:text-xl mt-2">:</span>
        
        <div class="flex flex-col items-center w-14 sm:w-16">
          <span class="font-mono text-xl sm:text-2xl font-medium text-[#e50914] bg-[#1a1a1a] rounded-lg w-full h-12 flex items-center justify-center border border-[#e50914]/20" id="cd-val-s">00</span>
          <span class="text-[9px] sm:text-[10px] text-[#e50914]/70 uppercase tracking-wider mt-2 font-medium">Secs</span>
        </div>
        
      </div>
    </div>
    
    <div class="hero-cta-wrapper">`;

content = content.replace(searchRegex, replacement);
fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Countdown UI replaced.");
