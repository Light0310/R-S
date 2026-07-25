import fs from 'fs';

async function count() {
  const response = await fetch('https://r-s-3lw3.onrender.com/api/seo/blog-posts');
  const data = await response.json();
  const posts = data.posts || [];
  
  let affectedCount = 0;
  
  const markdownRegex = /\[([^\]]+)\]\(\/(?:en\/?)?\)/gi;
  const htmlRegex = /<(?:a|Link)[^>]*(?:href|to)=['"]\/(?:en\/?)?['"][^>]*>([^<]+)<\/(?:a|Link)>/gi;
  
  for (const post of posts) {
    let changed = false;
    
    if (markdownRegex.test(post.content)) changed = true;
    if (htmlRegex.test(post.content)) changed = true;
    
    if (changed) affectedCount++;
  }
  
  console.log(affectedCount);
}

count();
