import fs from 'fs';

async function generate() {
  const response = await fetch('https://r-s-3lw3.onrender.com/api/seo/blog-posts');
  const data = await response.json();
  const posts = data.posts || [];
  
  let sql = '-- Run this script against your production PostgreSQL database\n\n';
  let affectedCount = 0;
  
  // We want to unwrap internal links.
  // Internal links in markdown: [text](/something)
  const markdownRegex = /\[([^\]]+)\]\(\/[^\)]*\)/g;
  
  // HTML links: <a href="/something">text</a> or <Link to="/something">text</Link>
  const htmlRegex = /<(a|Link)[^>]*(href|to)=['"]\/[^'"]*['"][^>]*>(.*?)<\/\1>/g;
  
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
      // Escape single quotes for SQL
      const escapedContent = newContent.replace(/'/g, "''");
      sql += `UPDATE blog_posts SET content = '${escapedContent}' WHERE id = ${post.id};\n`;
    }
  }
  
  fs.writeFileSync('fix_links.sql', sql);
  console.log(`Generated SQL for ${affectedCount} posts.`);
}

generate();
