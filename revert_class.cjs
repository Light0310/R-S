const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// I only did it for specific classes:
content = content.replace(/className="plan-cta"/g, 'class="plan-cta"');
content = content.replace(/className="cta-btn"/g, 'class="cta-btn"');
content = content.replace(/className="pricing-tag"/g, 'class="pricing-tag"');
content = content.replace(/className="plan-name"/g, 'class="plan-name"');
content = content.replace(/className="plan-price-wrapper"/g, 'class="plan-price-wrapper"');
content = content.replace(/className="plan-price"/g, 'class="plan-price"');
content = content.replace(/className="plan-currency"/g, 'class="plan-currency"');
content = content.replace(/className="plan-duration"/g, 'class="plan-duration"');
content = content.replace(/className="plan-desc"/g, 'class="plan-desc"');
content = content.replace(/className="plan-divider"/g, 'class="plan-divider"');
content = content.replace(/className="plan-features"/g, 'class="plan-features"');
content = content.replace(/className="premium-feature"/g, 'class="premium-feature"');
content = content.replace(/className="pricing-trust-signals"/g, 'class="pricing-trust-signals"');
content = content.replace(/className="testimonial-card"/g, 'class="testimonial-card"');
content = content.replace(/className="pricing-card popular scale-105 z-10"/g, 'class="pricing-card popular scale-105 z-10"');

// Actually wait, some elements like hero container probably had class= too. Let's look at the script I ran previously:
// "content = content.replace(/class="/g, 'className="');"
// I replaced ALL of them in the previous script!
content = content.replace(/className="/g, 'class="');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
