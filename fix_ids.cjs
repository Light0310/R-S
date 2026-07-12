const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// Update JS selectors
content = content.replace("document.getElementById('countdown-days');", "document.getElementById('cd-val-d');");
content = content.replace("document.getElementById('countdown-hours');", "document.getElementById('cd-val-h');");
content = content.replace("document.getElementById('countdown-minutes');", "document.getElementById('cd-val-m');");
content = content.replace("document.getElementById('countdown-seconds');", "document.getElementById('cd-val-s');");

// Update HTML IDs
content = content.replace('id="countdown-days"', 'id="cd-val-d"');
content = content.replace('id="countdown-hours"', 'id="cd-val-h"');
content = content.replace('id="countdown-minutes"', 'id="cd-val-m"');
content = content.replace('id="countdown-seconds"', 'id="cd-val-s"');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("IDs fixed in Home.tsx");
