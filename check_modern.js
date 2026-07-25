import fs from 'fs';

async function check() {
  const response = await fetch('https://r-s-3lw3.onrender.com/api/seo/blog-posts');
  const data = await response.json();
  const posts = data.posts || [];
  
  for (const post of posts) {
    if (post.content.toLowerCase().includes('modern smart streaming devices')) {
      const index = post.content.toLowerCase().indexOf('modern smart streaming devices');
      console.log(`Post ${post.id}:`);
      console.log(post.content.substring(Math.max(0, index - 50), index + 100));
      console.log('---');
    }
  }
}
check();
