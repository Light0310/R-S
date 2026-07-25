import fs from 'fs';

async function check() {
  const response = await fetch('https://r-s-3lw3.onrender.com/api/seo/blog-posts');
  const data = await response.json();
  const posts = data.posts || [];
  
  for (const post of posts) {
    const matches = post.content.match(/\[([^\]]+)\]\(\/(?:en)?\/?\)/g);
    if (matches) {
      console.log(`Post ${post.id}: ${matches.join(', ')}`);
    }
    const htmlMatches = post.content.match(/<(a|Link)[^>]*(href|to)=['"]\/(?:en)?\/?['"][^>]*>(.*?)<\/\1>/g);
    if (htmlMatches) {
      console.log(`Post ${post.id} (HTML): ${htmlMatches.join(', ')}`);
    }
  }
}
check();
