import fs from 'fs';

async function check() {
  const response = await fetch('https://r-s-3lw3.onrender.com/api/seo/blog-posts');
  const data = await response.json();
  const posts = data.posts || [];
  
  const urls = new Set();
  
  for (const post of posts) {
    const mdLinks = post.content.match(/\[[^\]]+\]\(([^\)]+)\)/g) || [];
    for (const match of mdLinks) {
      const url = match.match(/\(([^\)]+)\)/)[1];
      urls.add(url);
    }
    
    const htmlLinks = post.content.match(/href=['"]([^'"]+)['"]/g) || [];
    for (const match of htmlLinks) {
      const url = match.match(/['"]([^'"]+)['"]/)[1];
      urls.add(url);
    }
  }
  
  console.log("Unique URLs found:");
  urls.forEach(url => console.log(`- ${url}`));
}

check();
