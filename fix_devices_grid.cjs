const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const searchRegex = /<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

const replacement = `<div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <!-- Smart TV -->
          <div class="bg-[#141414] border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/50 shadow-lg hover:shadow-[#e50914]/20 group">
            <svg class="w-10 h-10 text-[#e50914] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
            <span class="text-white font-semibold text-sm font-sans text-center">Smart TV</span>
          </div>
          <!-- Android -->
          <div class="bg-[#141414] border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/50 shadow-lg hover:shadow-[#e50914]/20 group">
            <svg class="w-10 h-10 text-[#e50914] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            <span class="text-white font-semibold text-sm font-sans text-center">Android / iOS</span>
          </div>
          <!-- Apple TV -->
          <div class="bg-[#141414] border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/50 shadow-lg hover:shadow-[#e50914]/20 group">
            <svg class="w-10 h-10 text-[#e50914] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span class="text-white font-semibold text-sm font-sans text-center">Apple TV</span>
          </div>
          <!-- Firestick -->
          <div class="bg-[#141414] border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/50 shadow-lg hover:shadow-[#e50914]/20 group">
            <svg class="w-10 h-10 text-[#e50914] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line></svg>
            <span class="text-white font-semibold text-sm font-sans text-center">Firestick</span>
          </div>
          <!-- MAG Box -->
          <div class="bg-[#141414] border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/50 shadow-lg hover:shadow-[#e50914]/20 group">
            <svg class="w-10 h-10 text-[#e50914] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>
            <span class="text-white font-semibold text-sm font-sans text-center leading-tight">MAG / Formuler</span>
          </div>
          <!-- PC / Web -->
          <div class="bg-[#141414] border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/50 shadow-lg hover:shadow-[#e50914]/20 group">
            <svg class="w-10 h-10 text-[#e50914] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span class="text-white font-semibold text-sm font-sans text-center leading-tight">PC / Web Player</span>
          </div>
        </div>
      </div>
    </section>`;

content = content.replace(searchRegex, replacement);
fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Grid replaced");
