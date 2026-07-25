import fs from 'fs';

async function analyze() {
  const response = await fetch('https://r-s-3lw3.onrender.com/api/seo/blog-posts');
  const data = await response.json();
  const posts = data.posts || [];
  
  let affectedCount = 0;
  
  const markdownRegex = /\[([^\]]+)\]\(\/(?:en)?\/?\)/gi;
  const htmlRegex = /<(a|Link)[^>]*(href|to)=['"]\/(?:en)?\/?['"][^>]*>(.*?)<\/\1>/gi;
  
  for (const post of posts) {
    let newContent = post.content;
    let changed = false;
    
    if (markdownRegex.test(newContent)) {
      newContent = newContent.replace(markdownRegex, '$1');
      changed = true;
    }
    
    if (htmlRegex.test(newContent)) {
      newContent = newContent.replace(htmlRegex, '$3');
      changed = true;
    }
    
    if (changed) {
      affectedCount++;
      console.log(`Post ID: ${post.id}`);
    }
  }
  
  console.log(`Total affected posts: ${affectedCount}`);
}

analyze();
