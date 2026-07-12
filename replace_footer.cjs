const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const targetHTML = `<li><a href="https://wa.me/212694843943" target="_blank" rel="noopener noreferrer">Contact</a></li>`;
const newHTML = `<li><a href="https://wa.me/212694843943" target="_blank" rel="noopener noreferrer">Contact</a></li>
          <li><a href="/en/privacy" onclick="event.preventDefault(); window.dispatchEvent(new CustomEvent('navigate-privacy'))" class="privacy-link">Privacy Policy</a></li>`;

if (content.includes(targetHTML)) {
    content = content.replace(targetHTML, newHTML);
    fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
    console.log("Footer link updated");
} else {
    console.log("Could not find target html");
}
