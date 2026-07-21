const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const regex = /\/\/ Live Social Proof Toast[\s\S]*?const socialProofInterval = setInterval\(showNextPurchase, 45000\);/g;
content = content.replace(regex, '');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Removed social proof popup");
