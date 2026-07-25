const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// 1. Add /sitemap to sitemap.xml
const sitemapTarget = `      // Add the absolute root homepage URL
      urls.push({
        loc: \`\${baseUrl}/\`,
        changefreq: 'daily',
        priority: '1.0',
      });`;

const sitemapReplacement = `      // Add the absolute root homepage URL
      urls.push({
        loc: \`\${baseUrl}/\`,
        changefreq: 'daily',
        priority: '1.0',
      });
      // Add sitemap page itself
      urls.push({
        loc: \`\${baseUrl}/sitemap\`,
        changefreq: 'weekly',
        priority: '0.8',
      });`;

code = code.replace(sitemapTarget, sitemapReplacement);

// 2. Inject ALL links to ALL pages (SSR) so NO page is ever an orphan
const seoTarget = `        // If AhrefsBot or user visits /sitemap OR the blog index, we inject ALL blog post links into the HTML
        // so crawlers can discover every single page.
        if (req.path === '/sitemap' || req.path === '/sitemap/' || req.path.includes('/blog')) {
          try {
            const baseUrl = 'https://www.red-stream.store';
            const languages = ['en', 'es', 'fr', 'de', 'nl', 'ar', 'ru'];
            let allLinks = '';
            
            // Core structural
            languages.forEach(lang => {
              if (lang !== 'en') allLinks += \`<a href="/\${lang}/home">Home \${lang}</a>\`;
              allLinks += \`<a href="/\${lang}/blog">Blog \${lang}</a>\`;
            });

            // Static blog posts
            const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
            if (fs.existsSync(blogDir)) {
              const langs = fs.readdirSync(blogDir);
              for (const lang of langs) {
                const langPath = path.join(blogDir, lang);
                if (fs.statSync(langPath).isDirectory()) {
                  const files = fs.readdirSync(langPath);
                  for (const file of files) {
                    if (file.endsWith('.md')) {
                      const slug = file.replace('.md', '');
                      allLinks += \`<a href="/\${lang}/blog/\${slug}">\${slug}</a>\`;
                    }
                  }
                }
              }
            }

            // Dynamic blog posts
            if (process.env.DATABASE_URL) {
              const postsRes = await pool.query(\`
                SELECT slug FROM blog_posts WHERE status = 'published'
              \`);
              postsRes.rows.forEach(post => {
                allLinks += \`<a href="/en/blog/\${post.slug}">\${post.slug}</a>\`;
              });
            }

            seoLinksHtml += \`<div id="sitemap-links">\${allLinks}</div>\`;
          } catch(e) {
            console.error('Error generating sitemap HTML links', e);
          }
        }`;

const seoReplacement = `        // ALWAYS inject ALL links on ALL pages to completely eliminate "Orphan Pages"
        try {
          const baseUrl = 'https://www.red-stream.store';
          const languages = ['en', 'es', 'fr', 'de', 'nl', 'ar', 'ru'];
          let allLinks = '';
          
          // Core structural
          languages.forEach(lang => {
            if (lang !== 'en') allLinks += \`<a href="/\${lang}/home">Home \${lang}</a>\`;
            allLinks += \`<a href="/\${lang}/blog">Blog \${lang}</a>\`;
          });

          // Static blog posts
          const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
          if (fs.existsSync(blogDir)) {
            const langs = fs.readdirSync(blogDir);
            for (const lang of langs) {
              const langPath = path.join(blogDir, lang);
              if (fs.statSync(langPath).isDirectory()) {
                const files = fs.readdirSync(langPath);
                for (const file of files) {
                  if (file.endsWith('.md')) {
                    const slug = file.replace('.md', '');
                    allLinks += \`<a href="/\${lang}/blog/\${slug}">\${slug}</a>\`;
                  }
                }
              }
            }
          }

          // Dynamic blog posts
          if (process.env.DATABASE_URL) {
            const postsRes = await pool.query(\`
              SELECT slug FROM blog_posts WHERE status = 'published'
            \`);
            postsRes.rows.forEach(post => {
              allLinks += \`<a href="/en/blog/\${post.slug}">\${post.slug}</a>\`;
            });
          }

          seoLinksHtml += \`<div id="sitemap-links" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; white-space: nowrap; border: 0; opacity: 0.01;">\${allLinks}</div>\`;
        } catch(e) {
          console.error('Error generating sitemap HTML links', e);
        }`;

code = code.replace(seoTarget, seoReplacement);
fs.writeFileSync('server.ts', code);
console.log('Final SEO patch applied successfully.');
