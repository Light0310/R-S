const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});

async function migrate() {
  const dir = 'src/content/blog/en';
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const slug = file.replace('.md', '');
    
    // basic frontmatter extraction
    const match = content.match(/^---([\s\S]*?)---([\s\S]*)$/);
    if (!match) continue;
    
    const frontmatter = match[1];
    const body = match[2];
    
    let title = '';
    let description = '';
    let date = '';
    let author = 'RedStream Expert';
    let tags = '[]';
    
    const lines = frontmatter.split('\n');
    for (const line of lines) {
      if (line.startsWith('title:')) title = line.replace('title:', '').replace(/['"]/g, '').trim();
      if (line.startsWith('description:')) description = line.replace('description:', '').replace(/['"]/g, '').trim();
      if (line.startsWith('date:')) date = line.replace('date:', '').replace(/['"]/g, '').trim();
      if (line.startsWith('author:')) author = line.replace('author:', '').replace(/['"]/g, '').trim();
      if (line.startsWith('tags:')) {
        const tagString = line.replace('tags:', '').trim();
        if (tagString.startsWith('[')) {
            // Very naive parse
            tags = tagString.replace(/'/g, '"');
        }
      }
    }
    
    try {
      await pool.query(
        'INSERT INTO blog_posts (title, content, slug, description, tags, created_at) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (slug) DO NOTHING',
        [title, body.trim(), slug, description, JSON.parse(tags), date || new Date().toISOString()]
      );
      console.log('Migrated', slug);
    } catch (err) {
      console.error('Failed to migrate', slug, err.message);
    }
  }
  
  await pool.end();
}

migrate();
