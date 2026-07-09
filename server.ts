import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import seoRoutes from './src/routes/seoRoutes';
import { initializeDatabase, pool } from './src/controllers/seoController';
import { initCronScheduler } from './src/utils/cronScheduler';

async function startServer() {
  // Initialize database tables on server startup
  await initializeDatabase();

  // Initialize background cron scheduler
  initCronScheduler();

  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

  // Critically implement cors middleware to allow cross-origin requests
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token']
  }));

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Mount the SEO routes
  app.use('/api/seo', seoRoutes);

  // Dynamic XML Sitemap for elite search engine indexing
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const host = req.get('X-Forwarded-Host') || req.get('host') || 'redstream-iptv.com';
      const protocol = req.get('X-Forwarded-Proto') || req.protocol || 'https';
      const baseUrl = `${protocol}://${host}`;

      const languages = ['en', 'es', 'fr', 'de', 'nl', 'ar', 'ru'];
      const urls: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [];

      // 1. Core structural home and blog index URLs for all SEO languages
      languages.forEach((lang) => {
        urls.push({
          loc: `${baseUrl}/${lang}/home`,
          changefreq: 'daily',
          priority: '1.0',
        });
        urls.push({
          loc: `${baseUrl}/${lang}/blog`,
          changefreq: 'daily',
          priority: '0.8',
        });
      });

      // 2. Scan and append all static translation blog posts dynamically from the content filesystem
      const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
      if (fs.existsSync(blogDir)) {
        try {
          const langs = fs.readdirSync(blogDir);
          for (const lang of langs) {
            const langPath = path.join(blogDir, lang);
            if (fs.statSync(langPath).isDirectory()) {
              const files = fs.readdirSync(langPath);
              for (const file of files) {
                if (file.endsWith('.md')) {
                  const slug = file.replace('.md', '');
                  const stats = fs.statSync(path.join(langPath, file));
                  const lastmod = stats.mtime.toISOString().split('T')[0];
                  urls.push({
                    loc: `${baseUrl}/${lang}/blog/${slug}`,
                    lastmod,
                    changefreq: 'weekly',
                    priority: '0.7',
                  });
                }
              }
            }
          }
        } catch (fsErr: any) {
          console.error('[Sitemap] Filesystem scan error:', fsErr.message);
        }
      }

      // 3. Append all dynamically generated AI blog posts from PostgreSQL
      try {
        const postsRes = await pool.query(`
          SELECT slug, created_at
          FROM blog_posts
          WHERE status = 'published'
          ORDER BY created_at DESC
        `);

        postsRes.rows.forEach((post: any) => {
          const lastmod = new Date(post.created_at).toISOString().split('T')[0];
          urls.push({
            loc: `${baseUrl}/en/blog/${post.slug}`,
            lastmod,
            changefreq: 'weekly',
            priority: '0.7',
          });
        });
      } catch (dbErr: any) {
        console.error('[Sitemap] Database post query error:', dbErr.message);
      }

      // 4. Construct perfectly valid, high-compliance sitemap XML string
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      urls.forEach((url) => {
        xml += '  <url>\n';
        xml += `    <loc>${url.loc}</loc>\n`;
        if (url.lastmod) {
          xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        }
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += '  </url>\n';
      });

      xml += '</urlset>';

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error: any) {
      console.error('[Sitemap] Critical generation failure:', error.message);
      res.status(500).send('Error generating sitemap');
    }
  });

  // Dynamic robots.txt that links Googlebot directly to the XML sitemap
  app.get('/robots.txt', (req, res) => {
    const host = req.get('X-Forwarded-Host') || req.get('host') || 'redstream-iptv.com';
    const protocol = req.get('X-Forwarded-Proto') || req.protocol || 'https';
    const baseUrl = `${protocol}://${host}`;

    const content = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.header('Content-Type', 'text/plain');
    res.send(content);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
