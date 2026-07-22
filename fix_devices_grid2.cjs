const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const searchRegex = /<div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

const replacement = `<div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
          <!-- Smart TV -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center relative z-10">Smart TV</span>
          </div>
          <!-- Android -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center relative z-10">Android / iOS</span>
          </div>
          <!-- Apple TV -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center relative z-10">Apple TV</span>
          </div>
          <!-- Firestick -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center relative z-10">Firestick</span>
          </div>
          <!-- MAG Box -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center leading-tight relative z-10">MAG / Formuler</span>
          </div>
          <!-- PC / Web -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center leading-tight relative z-10">PC / Web Player</span>
          </div>
        </div>
      </div>
    </section>`;

content = content.replace(searchRegex, replacement);
fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Grid replaced 2");
