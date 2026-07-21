const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const heroTrustHTML = `
    <!-- Secure Payment Badges -->
    <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px; align-items: center; filter: grayscale(100%) opacity(0.7);">
      <svg style="height: 24px;" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-1.1.6-2.1.6-1.1 0-2.5-.2-3.1-.5zm5.4-5.3c-.3 0-.6.3-.7.6l-1.6 6.1c0 .1-.1.1-.2.1h-2.6c-.1 0-.2 0-.2-.2l2.7-8.7c0-.2.3-.3.5-.3h2.6c.1 0 .2.2.2.2l-1 2.2zm-7.6 6.4h-2.6c-.1 0-.2 0-.2-.2L7.3 8.3c0-.1-.1-.1-.2-.2-.2-.1-.7-.3-1.5-.5L5.7 7c.8-.1 1.6-.2 2.3-.2.3 0 .4.1.5.3l1.8 7.3z" fill="#1434CB"></path></svg>
      <svg style="height: 24px;" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.2-3 3.3-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
      <svg style="height: 24px;" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.4-1.6-.7-3.1-.7h-4.7c-.1 0-.2.1-.2.2l-2.7 17.3c0 .1.1.2.2.2h3.2c.1 0 .2-.1.2-.2l1.3-8.2c0-.1.1-.2.2-.2h1.5c4.6 0 6.9-2.3 4.7-6.1z"></path><path fill="#3086C8" d="M23.9 8.3c-1.1 5.4-4.8 6.1-8 6.1H15c-.1 0-.2.1-.2.2l-1.3 8.2c0 .1.1.2.2.2h3.2c.1 0 .2-.1.2-.2l.9-5.9c0-.1.1-.2.2-.2h1.5c3.8 0 6.3-1.6 7-4.6 1-4.1-1.6-4.5-2.8-4.2z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2.1-.2.2l-2.7 17.3c0 .1.1.2.2.2h3.2c.1 0 .2-.1.2-.2l.6-4c0-.1.1-.2.2-.2h1.5c3.2 0 5.4-1.3 6-3.8.7-3 .2-5.4-1.4-6.8-.7-.6-1.5-1.1-2.9-1.3z"></path></svg>
      <span style="font-size: 0.8rem; font-weight: 500; letter-spacing: 0.5px;">SSL SECURE PAYMENT</span>
    </div>
`;

content = content.replace(
  /Start Watching Instantly on WhatsApp\s*<\/a>\s*<!-- Trust Badges Under Hero CTA -->/,
  `Start Watching Instantly on WhatsApp\n    </a>\n${heroTrustHTML}\n    <!-- Trust Badges Under Hero CTA -->`
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Updated Home.tsx with hero trust signals");
