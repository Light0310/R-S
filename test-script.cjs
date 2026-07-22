const fs = require('fs');
const content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const match = content.match(/<!-- How it Works Section -->[\s\S]*?<\/div>\s*<\/div>\s*<div class="pricing-grid"/);
if (match) {
    console.log(match[0]);
} else {
    console.log("Not found");
}
