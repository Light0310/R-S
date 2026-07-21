const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace('<span class="countdown-number" id="cd-val-d">03</span>', '<span class="countdown-number" id="cd-val-d">00</span>');
content = content.replace('<span class="countdown-number" id="cd-val-h">23</span>', '<span class="countdown-number" id="cd-val-h">00</span>');
content = content.replace('<span class="countdown-number" id="cd-val-m">59</span>', '<span class="countdown-number" id="cd-val-m">00</span>');
content = content.replace('<span class="countdown-number" id="cd-val-s">59</span>', '<span class="countdown-number" id="cd-val-s">00</span>');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Timer HTML fixed");
