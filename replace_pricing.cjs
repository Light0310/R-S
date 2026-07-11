const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const startTag = '<div class="pricing-grid">';
const endTag = '  <!-- Premium Testimonials Carousel Section -->';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  const newPricingHTML = `
      <div class="pricing-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
        <!-- Plan 1: 1 Month -->
        <div class="pricing-card" id="plan-1month">
          <div class="plan-header">
            <h3 class="plan-name">1 Month</h3>
            <div class="plan-price-wrapper">
              <span class="plan-price">12</span>
              <span class="plan-currency">€</span>
              <span class="plan-duration">/Month</span>
            </div>
            <p class="plan-desc">Flexible month-by-month premium access. Cancel anytime.</p>
          </div>
          <div class="plan-divider"></div>
          <ul class="plan-features">
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 20,000+ Live Channels</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 60,000+ VOD Movies</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 4K / Ultra HD Quality</li>
          </ul>
          <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20want%20to%20order%20the%201%20Month%20Plan%20for%2012%E2%82%AC." target="_blank" rel="noopener noreferrer" class="plan-cta" id="btn-1month-order">Order 1 Month</a>
        </div>

        <!-- Plan 2: 6 Months (Decoy) -->
        <div class="pricing-card" id="plan-6months">
          <div class="plan-header">
            <h3 class="plan-name">6 Months</h3>
            <div class="plan-price-wrapper">
              <span class="plan-price">39</span>
              <span class="plan-currency">€</span>
              <span class="plan-duration">/6 Months</span>
            </div>
            <p class="plan-desc">Our highly popular plan. Ideal for keeping up with sports season.</p>
          </div>
          <div class="plan-divider"></div>
          <ul class="plan-features">
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 20,000+ Live Channels</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 60,000+ VOD Movies</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 4K / Ultra HD Quality</li>
            <li class="premium-feature"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Anti-Freeze Stable Server</li>
          </ul>
          <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20want%20to%20order%20the%206%20Months%20Plan%20for%2039%E2%82%AC." target="_blank" rel="noopener noreferrer" class="plan-cta" id="btn-6months-order">Order 6 Months</a>
        </div>

        <!-- Plan 3: 12 Months (Pulsing Red Neon Highlighted - Best Value) -->
        <div class="pricing-card popular" id="plan-12months" style="border: 2px solid #e50914; box-shadow: 0 0 20px rgba(229, 9, 20, 0.4); transform: scale(1.05);">
          <div class="pricing-tag" style="background: #e50914; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: max-content;">🔥 Best Value (Save 65%)</div>
          <div class="plan-header">
            <h3 class="plan-name">12 Months</h3>
            <div class="plan-price-wrapper">
              <span class="plan-price">49</span>
              <span class="plan-currency">€</span>
              <span class="plan-duration">/Year</span>
            </div>
            <p class="plan-desc">Ultimate premium package. Only 10€ more than 6 months!</p>
          </div>
          <div class="plan-divider"></div>
          <ul class="plan-features">
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 20,000+ Live Channels</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 60,000+ VOD Movies</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 4K / Ultra HD Quality</li>
            <li class="premium-feature"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Anti-Freeze Stable Server</li>
            <li class="premium-feature"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 24/7 VIP Customer Support</li>
          </ul>
          <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20want%20to%20order%20the%2012%20Months%20Premium%20Plan%20for%2049%E2%82%AC." target="_blank" rel="noopener noreferrer" class="plan-cta" style="background: #e50914; color: white;" id="btn-12months-order">Order 12 Months</a>
        </div>
      </div>
    </div>
  </section>

`;
  
  const modifiedContent = content.substring(0, startIndex) + newPricingHTML + content.substring(endIndex);
  fs.writeFileSync('src/components/Home.tsx', modifiedContent, 'utf8');
  console.log("Pricing updated");
} else {
  console.log("Could not find boundaries");
}
