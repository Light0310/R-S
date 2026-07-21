const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// The sitemap section is a bit messed up. Let's find the try catch block for database posts.
const startSearch = "// 3. Append all dynamically generated AI blog posts from PostgreSQL";
const endSearch = "// 4. Construct perfectly valid, high-compliance sitemap XML string";

const startIndex = content.indexOf(startSearch);
const endIndex = content.indexOf(endSearch);

if (startIndex !== -1 && endIndex !== -1) {
  const newBlock = `// 3. Append all dynamically generated AI blog posts from PostgreSQL
      try {
        if (process.env.DATABASE_URL) {
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
        }
      } catch (dbErr: any) {
        console.error('[Sitemap] Database post query error:', dbErr.message);
      }
      
      `;
      
  const before = content.substring(0, startIndex);
  const after = content.substring(endIndex);
  fs.writeFileSync('server.ts', before + newBlock + after, 'utf8');
}

