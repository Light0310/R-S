const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const searchRegex = /<div class="features-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

const replacement = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Benefit 1 -->
        <div class="bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#e50914]/40 hover:shadow-[0_15px_30px_rgba(229,9,20,0.1)] group">
          <div class="w-14 h-14 bg-[#e50914] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#e50914]/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg uppercase tracking-wide mb-3">Anti-Freeze 9.0</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Intelligent load-balancing and direct peering with major ISPs guarantees stream stability even during major events.</p>
        </div>

        <!-- Benefit 2 -->
        <div class="bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#e50914]/40 hover:shadow-[0_15px_30px_rgba(229,9,20,0.1)] group">
          <div class="w-14 h-14 bg-[#e50914] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#e50914]/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M12 2V22M17 5H9.5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8H14.5C15.3284 8 16 8.67157 16 9.5C16 10.3284 15.3284 11 14.5 11H8M12 11V14M16 14H10C9.17157 14 8.5 14.6716 8.5 15.5C8.5 16.3284 9.17157 17 10 17H14C14.8284 17 15.5 17.6716 15.5 18.5C15.5 19.3284 14.8284 20 14 20H8"/>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg uppercase tracking-wide mb-3">10-Min Setup</h3>
          <p class="text-gray-400 text-sm leading-relaxed">No waiting games. Purchase your subscription and receive your personalized login via WhatsApp in minutes.</p>
        </div>

        <!-- Benefit 3 -->
        <div class="bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#e50914]/40 hover:shadow-[0_15px_30px_rgba(229,9,20,0.1)] group">
          <div class="w-14 h-14 bg-[#e50914] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#e50914]/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="2" y1="7" x2="7" y2="7"/>
              <line x1="2" y1="17" x2="7" y2="17"/>
              <line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg uppercase tracking-wide mb-3">20K Live & 60K VOD</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Full sports catalogs, local channels, premium cinema, and the hottest streaming releases in one place.</p>
        </div>

        <!-- Benefit 4 -->
        <div class="bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#e50914]/40 hover:shadow-[0_15px_30px_rgba(229,9,20,0.1)] group">
          <div class="w-14 h-14 bg-[#e50914] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#e50914]/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg uppercase tracking-wide mb-3">24/7 WhatsApp</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Real human engineers ready to help you with activation, device troubleshooting, and setup anytime.</p>
        </div>
      </div>
    </div>
  </section>`;

content = content.replace(searchRegex, replacement);
fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Features updated to Tailwind and centered.");
