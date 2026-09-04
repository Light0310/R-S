import { pool } from './src/controllers/seoController.js';
import fs from 'fs';
import path from 'path';

async function fixOldPosts() {
  console.log('Starting cleanup of old posts...');
  
  if (process.env.SQL_HOST) {
    try {
      const client = await pool.connect();
      try {
        const res = await client.query('SELECT id, slug, content FROM blog_posts');
        for (const row of res.rows) {
          if (row.content && (row.content.includes('RedStream IPTV Call to Action') || row.content.includes('RedStream IPTV (20,000+ live channels'))) {
            let updatedContent = row.content;
            updatedContent = updatedContent.replace(/RedStream IPTV Call to Action/g, 'RedStream Call to Action');
            updatedContent = updatedContent.replace(/recommending RedStream IPTV \(20,000\+ live channels, 60,000\+ VODs, 4K Ultra HD, Anti-Freeze 9\.0 servers\)/g, 'recommending RedStream (Premium streaming servers, 4K Ultra HD, Anti-Freeze 9.0 servers)');
            updatedContent = updatedContent.replace(/RedStream™ Premium IPTV/g, 'RedStream™ Premium Streaming');
            updatedContent = updatedContent.replace(/RedStream IPTV/gi, 'RedStream Premium Streaming');
            
            await client.query('UPDATE blog_posts SET content = $1 WHERE id = $2', [updatedContent, row.id]);
            console.log(`Updated post in DB: ${row.slug}`);
          }
        }
      } finally {
        client.release();
      }
    } catch (e) {
      console.error('DB Error:', e);
    }
  }

  const blogDir = './src/content/blog/en';
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        let modified = false;
        
        if (content.includes('RedStream IPTV Call to Action') || content.includes('RedStream IPTV (20,000+ live channels') || content.match(/RedStream IPTV/gi)) {
            content = content.replace(/RedStream IPTV Call to Action/g, 'RedStream Call to Action');
            content = content.replace(/recommending RedStream IPTV \(20,000\+ live channels, 60,000\+ VODs, 4K Ultra HD, Anti-Freeze 9\.0 servers\)/g, 'recommending RedStream (Premium streaming servers, 4K Ultra HD, Anti-Freeze 9.0 servers)');
            content = content.replace(/RedStream™ Premium IPTV/g, 'RedStream™ Premium Streaming');
            content = content.replace(/RedStream IPTV/gi, 'RedStream Premium Streaming');
            modified = true;
        }

        if (modified) {
          fs.writeFileSync(filePath, content, 'utf-8');
          console.log(`Updated markdown file: ${file}`);
        }
      }
    }
  }
  
  const jsonPath = './src/content/dynamic_posts.json';
  if (fs.existsSync(jsonPath)) {
      try {
          const raw = fs.readFileSync(jsonPath, 'utf-8');
          let posts = JSON.parse(raw);
          let modified = false;
          
          posts = posts.map(p => {
              if (p.content && (p.content.includes('RedStream IPTV Call to Action') || p.content.includes('RedStream IPTV (20,000+ live channels') || p.content.match(/RedStream IPTV/gi))) {
                  p.content = p.content.replace(/RedStream IPTV Call to Action/g, 'RedStream Call to Action');
                  p.content = p.content.replace(/recommending RedStream IPTV \(20,000\+ live channels, 60,000\+ VODs, 4K Ultra HD, Anti-Freeze 9\.0 servers\)/g, 'recommending RedStream (Premium streaming servers, 4K Ultra HD, Anti-Freeze 9.0 servers)');
                  p.content = p.content.replace(/RedStream™ Premium IPTV/g, 'RedStream™ Premium Streaming');
                  p.content = p.content.replace(/RedStream IPTV/gi, 'RedStream Premium Streaming');
                  modified = true;
              }
              return p;
          });
          
          if (modified) {
              fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf-8');
              console.log('Updated dynamic_posts.json');
          }
      } catch(e) {
          console.error('JSON Error:', e);
      }
  }

  console.log('Cleanup complete!');
  process.exit(0);
}

fixOldPosts();
