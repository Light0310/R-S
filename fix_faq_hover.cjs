const fs = require('fs');
let content = fs.readFileSync('src/components/FAQSection.tsx', 'utf8');

content = content.replace(
  /className=\{`bg-\\[#111111\\] border rounded-xl overflow-hidden transition-all duration-300 \$\{/g,
  "className={`bg-[#0a0a0a] border rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl ${"
);

content = content.replace(
  /: 'border-\\[#1a1a1a\\] hover:border-\\[#2a2a2a\\]'/g,
  ": 'border-[#1f2937] hover:border-[rgba(229,9,20,0.5)]'"
);

fs.writeFileSync('src/components/FAQSection.tsx', content, 'utf8');
console.log("Updated FAQSection.tsx");
