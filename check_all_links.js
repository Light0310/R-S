import fs from 'fs';

async function check() {
  const response = await fetch('https://r-s-3lw3.onrender.com/api/seo/blog-posts');
  const data = await response.json();
  const posts = data.posts || [];
  
  for (const post of posts) {
    const matches = post.content.match(/\]\(\/[^\)]*\)/g) || [];
    for (const match of matches) {
      if (match === '](/)' || match === '](/en)' || match === '](/en/)') {
        console.log(`Post ${post.id}: EXACT MATCH: ${match}`);
      }
    }
  }
}
check();
