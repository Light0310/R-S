const fs = require('fs');

async function getSitemap() {
  const res = await fetch('https://r-s-3lw3.onrender.com/sitemap.xml');
  const text = await res.text();
  console.log(text.substring(0, 1500));
}
getSitemap();
