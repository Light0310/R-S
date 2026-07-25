import fs from 'fs';

async function check() {
  const response = await fetch('https://r-s-3lw3.onrender.com/api/seo/blog-posts');
  const data = await response.json();
  const posts = data.posts || [];
  
  let rootLinksCount = 0;
  
  for (const post of posts) {
    const mdLinks = post.content.match(/\[[^\]]+\]\([^\)]+\)/g) || [];
    let hasRoot = false;
    for (const link of mdLinks) {
      if (link.includes('(/)') || link.includes('(/en)') || link.includes('(/en/)')) {
        console.log(`Post ${post.id} MD: ${link}`);
        hasRoot = true;
      }
    }
    
    const htmlLinks = post.content.match(/<(?:a|Link)[^>]+>[^<]+<\/(?:a|Link)>/gi) || [];
    for (const link of htmlLinks) {
      if (link.includes('href="/"') || link.includes("href='/'") || link.includes('href="/en"') || link.includes('to="/"') || link.includes('to="/en"')) {
        console.log(`Post ${post.id} HTML: ${link}`);
        hasRoot = true;
      }
    }
    if (hasRoot) rootLinksCount++;
  }
  console.log(`Total posts with root links: ${rootLinksCount}`);
}

check();
