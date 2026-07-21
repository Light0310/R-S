const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// 1. Negative Space: Add py-16 md:py-24 to sections to give them breathing room
content = content.replace(/<section class="features" id="features">/g, '<section class="features py-16 md:py-24" id="features">');
content = content.replace(/<section class="pricing" id="pricing">/g, '<section class="pricing py-16 md:py-24" id="pricing">');
content = content.replace(/<section class="compatibility" id="compatibility"[^>]*>/g, '<section class="compatibility py-16 md:py-24" id="compatibility">');
content = content.replace(/<section class="showcase-section" id="showcase-section">/g, '<section class="showcase-section py-16 md:py-24" id="showcase-section">');
content = content.replace(/<section class="hero container" id="hero-section">/g, '<section class="hero container py-16 md:py-24" id="hero-section">');

// 2. Typography: Sentence case for descriptions, remove caps and italics, add text-gray-400
content = content.replace(/class="plan-desc"/g, 'class="plan-desc text-gray-400 font-normal normal-case not-italic"');
content = content.replace(/class="feature-desc"/g, 'class="feature-desc text-gray-400 font-normal normal-case not-italic"');

// 3. Make titles white and clean
content = content.replace(/<h2([^>]*)>/g, '<h2$1 class="text-white">');
// Since some h2 already have classes, let's just make sure they are white via css, but adding Tailwind is fine if they don't have a class attribute.
// Let's modify index.html CSS instead for the global color rules so we don't duplicate.

// 4. 12 Month Card sales touch
// Let's update the pricing-tag to be beautifully absolute at the top
const newPricingTag = `<div class="pricing-tag absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#e50914] text-white px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.6)] z-20 whitespace-nowrap">BEST VALUE</div>`;
content = content.replace(/<div class="pricing-tag" style="[^"]*">.*?<\/div>/g, newPricingTag);

// Ensure the 12 month card has scale-105 always
content = content.replace(/<div class="pricing-card popular scale-105 z-10" id="plan-12months" style="[^"]*">/g, '<div class="pricing-card popular scale-105 transform z-10 border border-[#e50914]/50 shadow-[0_10px_30px_rgba(229,9,20,0.2)]" id="plan-12months">');
content = content.replace(/<div class="pricing-card popular scale-105 z-10" id="plan-12months" style=\{\{[^\}]*\}\}>/g, '<div class="pricing-card popular scale-105 transform z-10 border border-[#e50914]/50 shadow-[0_10px_30px_rgba(229,9,20,0.2)] relative" id="plan-12months">');

// Make sure the big CTA buttons have the glow
content = content.replace(/class="plan-cta" style=\{\{ background: '#e50914'[^}]*\}\}/g, 'class="plan-cta bg-[#e50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:shadow-[0_0_30px_rgba(229,9,20,0.8)] transition-shadow"');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');

// Also update index.html to enforce typography rules
let css = fs.readFileSync('index.html', 'utf8');
// remove text-transform uppercase from global headings just in case
css = css.replace(/h1,\s*h2,\s*h3,\s*h4\s*\{[\s\S]*?\}/g, 'h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em; color: #ffffff; text-transform: none; font-style: normal; }');
// clean descriptions
css = css.replace(/\.plan-desc\s*\{[\s\S]*?\}/g, '.plan-desc { font-size: 14px; margin-bottom: 24px; line-height: 1.6; }');
css = css.replace(/\.feature-desc\s*\{[\s\S]*?\}/g, '.feature-desc { font-size: 14px; line-height: 1.6; }');

// reduce hero title size slightly if it's too big and remove italic
css = css.replace(/\.hero h1\s*\{[\s\S]*?\}/g, '.hero h1 { font-family: var(--font-display); font-size: clamp(36px, 6vw, 64px); font-weight: 800; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.02em; color: #ffffff; font-style: normal; text-transform: none; }');

fs.writeFileSync('index.html', css, 'utf8');
