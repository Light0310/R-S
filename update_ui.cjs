const fs = require('fs');

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// 1. Remove the Exit Intent Modal
const exitModalRegex = /\s*\/\/ Exit Intent Modal[\s\S]*?(?=\s*\/\/ Testimonials slider)/;
content = content.replace(exitModalRegex, '\n\n');

// 2. Add Secondary CTA in Hero Section
const heroCtaSearch = `    <!-- WhatsApp CTA -->
    <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20would%20like%20to%20activate%20a%20premium%20IPTV%20subscription." target="_blank" rel="noopener noreferrer" class="cta-btn" style="box-shadow: 0 0 25px rgba(229,9,20,0.6);" id="hero-main-cta">
      <!-- WhatsApp Icon -->
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.012 14.059.99 11.45.99c-5.442 0-9.866 4.372-9.87 9.802 0 1.672.454 3.302 1.313 4.735L1.87 20.895l5.59-1.452l-.003-.004-.002-.002-.001-.001zm11.488-7.7c-.3-.15-1.774-.875-2.05-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-3.04-1.516-4.004-2.614-4.834-4.04-.22-.38-.02-.585.18-.78.18-.175.4-.475.6-.7.2-.225.27-.375.4-.625.13-.25.07-.475-.03-.675-.1-.2-.675-1.626-.925-2.225-.244-.589-.49-.51-.675-.52l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.225 5.116 4.525.715.31 1.273.495 1.708.633.72.23 1.374.197 1.892.12.577-.087 1.774-.725 2.025-1.425.25-.7.25-1.3 1.15-1.425.075-.013.15-.075.225-.11z"/>
      </svg>
      Start Watching Instantly on WhatsApp
    </a>`;

const heroCtaReplace = `    <!-- CTA Actions Container -->
    <div class="flex flex-col items-center gap-4 w-full">
      <!-- WhatsApp CTA -->
      <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20would%20like%20to%20activate%20a%20premium%20IPTV%20subscription." target="_blank" rel="noopener noreferrer" class="cta-btn w-full max-w-[320px] sm:max-w-[400px] mx-auto justify-center" style="box-shadow: 0 0 25px rgba(229,9,20,0.6);" id="hero-main-cta">
        <!-- WhatsApp Icon -->
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.012 14.059.99 11.45.99c-5.442 0-9.866 4.372-9.87 9.802 0 1.672.454 3.302 1.313 4.735L1.87 20.895l5.59-1.452l-.003-.004-.002-.002-.001-.001zm11.488-7.7c-.3-.15-1.774-.875-2.05-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-3.04-1.516-4.004-2.614-4.834-4.04-.22-.38-.02-.585.18-.78.18-.175.4-.475.6-.7.2-.225.27-.375.4-.625.13-.25.07-.475-.03-.675-.1-.2-.675-1.626-.925-2.225-.244-.589-.49-.51-.675-.52l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.225 5.116 4.525.715.31 1.273.495 1.708.633.72.23 1.374.197 1.892.12.577-.087 1.774-.725 2.025-1.425.25-.7.25-1.3 1.15-1.425.075-.013.15-.075.225-.11z"/>
        </svg>
        Start Watching Instantly on WhatsApp
      </a>
      
      <!-- Secondary CTA -->
      <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20would%20like%20to%20request%20my%202-Hour%20Free%20Trial." target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center border border-gray-500 text-gray-300 hover:text-white hover:border-white transition-all rounded-md px-6 py-[14px] font-semibold tracking-wider text-[15px] w-full max-w-[320px] sm:max-w-[400px] mx-auto bg-transparent" id="hero-secondary-cta" style="font-family: var(--font-display); text-transform: uppercase;">
        Request 2-Hour Free Trial
      </a>
    </div>`;

content = content.replace(heroCtaSearch, heroCtaReplace);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');

console.log("Done updating!");
