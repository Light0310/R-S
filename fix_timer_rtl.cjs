const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const target = '<div class="countdown-timer">';
const replacement = '<div class="countdown-timer" dir="ltr">';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
    console.log("Timer dir fixed.");
} else {
    console.log("Target not found.");
}
