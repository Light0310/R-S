import fs from 'fs';

async function check() {
  const response = await fetch('https://r-s-3lw3.onrender.com/api/seo/blog-posts');
  const data = await response.json();
  const posts = data.posts || [];
  
  for (const post of posts) {
    const matches = post.content.match(/\]\(\/[^\)]*\)/g) || [];
    for (const match of matches) {
      console.log(`Post ${post.id}: ${match}`);
    }
    
    const htmlMatches = post.content.match(/href=['"]\/[^'"]*['"]/g) || [];
    for (const match of htmlMatches) {
      console.log(`Post ${post.id} HTML: ${match}`);
    }
  }
}
check();
