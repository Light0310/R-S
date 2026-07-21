const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// 1. Simplify Trust Badges and Payment Icons under Hero
const heroActionsSearch = /<!-- Secure Payment Badges -->[\s\S]*?(?=<!-- Features Section -->)/;

const heroActionsReplace = `<!-- Sleek Trust Signals -->
    <div class="flex flex-col items-center gap-4 mt-8 opacity-70">
      <!-- Minimalist Features -->
      <div class="flex flex-wrap justify-center gap-4 text-xs font-medium tracking-wide text-gray-400 uppercase">
        <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-[#e50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Instant Setup</span>
        <span class="hidden sm:inline text-gray-600">•</span>
        <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-[#e50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> 99.9% Uptime</span>
        <span class="hidden sm:inline text-gray-600">•</span>
        <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-[#e50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg> 24/7 Support</span>
      </div>

      <!-- Payment Icons (Tiny & Clean) -->
      <div class="flex items-center gap-3 grayscale opacity-60">
        <svg style="height: 16px;" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-1.1.6-2.1.6-1.1 0-2.5-.2-3.1-.5zm5.4-5.3c-.3 0-.6.3-.7.6l-1.6 6.1c0 .1-.1.1-.2.1h-2.6c-.1 0-.2 0-.2-.2l2.7-8.7c0-.2.3-.3.5-.3h2.6c.1 0 .2.2.2.2l-1 2.2zm-7.6 6.4h-2.6c-.1 0-.2 0-.2-.2L7.3 8.3c0-.1-.1-.1-.2-.2-.2-.1-.7-.3-1.5-.5L5.7 7c.8-.1 1.6-.2 2.3-.2.3 0 .4.1.5.3l1.8 7.3z" fill="#1434CB"></path></svg>
        <svg style="height: 16px;" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.2-3 3.3-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
        <svg style="height: 16px;" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.4-1.6-.7-3.1-.7h-4.7c-.1 0-.2.1-.2.2l-2.7 17.3c0 .1.1.2.2.2h3.2c.1 0 .2-.1.2-.2l1.3-8.2c0-.1.1-.2.2-.2h1.5c4.6 0 6.9-2.3 4.7-6.1z"></path><path fill="#3086C8" d="M23.9 8.3c-1.1 5.4-4.8 6.1-8 6.1H15c-.1 0-.2.1-.2.2l-1.3 8.2c0 .1.1.2.2.2h3.2c.1 0 .2-.1.2-.2l.9-5.9c0-.1.1-.2.2-.2h1.5c3.8 0 6.3-1.6 7-4.6 1-4.1-1.6-4.5-2.8-4.2z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2.1-.2.2l-2.7 17.3c0 .1.1.2.2.2h3.2c.1 0 .2-.1.2-.2l.6-4c0-.1.1-.2.2-.2h1.5c3.2 0 5.4-1.3 6-3.8.7-3 .2-5.4-1.4-6.8-.7-.6-1.5-1.1-2.9-1.3z"></path></svg>
      </div>
    </div>
  </section>

  <!-- Live Stats (Moved outside hero, minimalist design) -->
  <section class="border-y border-gray-800/50 bg-black/50 py-8">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800/50">
        <div class="flex flex-col items-center pt-4 md:pt-0">
          <span class="text-3xl font-bold text-white tracking-tight mb-1">15,000+</span>
          <span class="text-sm text-gray-400 font-medium uppercase tracking-wider">Happy Clients</span>
        </div>
        <div class="flex flex-col items-center pt-4 md:pt-0">
          <span class="text-3xl font-bold text-[#e50914] tracking-tight mb-1">99.9%</span>
          <span class="text-sm text-gray-400 font-medium uppercase tracking-wider">Server Uptime</span>
        </div>
        <div class="flex flex-col items-center pt-4 md:pt-0">
          <span class="text-3xl font-bold text-white tracking-tight mb-1">4.9 / 5</span>
          <span class="text-sm text-gray-400 font-medium uppercase tracking-wider">Google Rating</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->`;

content = content.replace(heroActionsSearch, heroActionsReplace);

// 2. Change the secondary CTA from a big button to a clean text link
const secondaryCtaSearch = /<!-- Secondary CTA -->[\s\S]*?<\/a>/;
const secondaryCtaReplace = `<!-- Secondary CTA -->
      <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20would%20like%20to%20request%20my%202-Hour%20Free%20Trial." target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors text-sm font-medium underline underline-offset-4 decoration-gray-600 hover:decoration-white mt-2" id="hero-secondary-cta">
        Or request a 2-Hour Free Trial
      </a>`;

content = content.replace(secondaryCtaSearch, secondaryCtaReplace);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("UX Fixes Applied");
