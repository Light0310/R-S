const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<!-- Favicon Implementation -->[\s\S]*?<link rel="manifest".*?\/>/m;

const newFavicon = `<!-- Favicon Implementation -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />`;

if (regex.test(html)) {
    html = html.replace(regex, newFavicon);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("index.html updated successfully");
} else {
    console.log("Could not find the Favicon block in index.html");
}

const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#e50914"/>
  <path d="M38 28 L38 72 L72 50 Z" fill="white"/>
</svg>`;

fs.writeFileSync('public/favicon.svg', svgFavicon, 'utf8');
console.log("favicon.svg generated");
