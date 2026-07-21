const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  /const postsRes = await pool.query\(\`[\s\S]*?ORDER BY created_at DESC[\s\S]*?\`\);/,
  `if (process.env.DATABASE_URL) {
          const postsRes = await pool.query(\`
            SELECT slug, created_at
            FROM blog_posts
            WHERE status = 'published'
            ORDER BY created_at DESC
          \`);
          postsRes.rows.forEach((post: any) => {
            const lastmod = new Date(post.created_at).toISOString().split('T')[0];
            urls.push({
              loc: \`\${baseUrl}/en/blog/\${post.slug}\`,
              lastmod,
              changefreq: 'weekly',
              priority: '0.7',
            });
          });
        }`
);

// We need to also comment out or remove the existing postsRes iteration to avoid duplicates if we replaced it this way
fs.writeFileSync('server.ts', content, 'utf8');
