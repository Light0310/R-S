import { Router, Request, Response, NextFunction } from 'express';
import { executeSearchIntegration, getStoredSeoResults, pool } from '../controllers/seoController';
import { executeAutoContentGeneration } from '../services/contentGenerator';

const router = Router();

/**
 * Security Middleware to protect the SerpApi quota.
 * Verifies that the request contains an x-admin-token header matching ADMIN_SECRET.
 */
const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['x-admin-token'];
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    console.error('[SEO Routes] ADMIN_SECRET environment variable is missing.');
    res.status(500).json({ message: 'Server configuration error' });
    return;
  }

  if (!token || token !== adminSecret) {
    res.status(403).json({ message: 'Forbidden: Invalid or missing admin token' });
    return;
  }

  next();
};

// POST /run-search - Protected endpoint to manually trigger a SerpApi search
router.post('/run-search', adminAuthMiddleware, executeSearchIntegration);

// GET /results - Protected endpoint to retrieve stored SEO results (queries and link targets)
router.get('/results', adminAuthMiddleware, getStoredSeoResults);

// POST /generate-content - Protected endpoint to trigger AI blog content generation
router.post('/generate-content', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await executeAutoContentGeneration();
    if (!result.success) {
      res.status(400).json(result);
      return;
    }
    res.json(result);
  } catch (error: any) {
    console.error('[SEO Routes] Error in generate-content endpoint:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /add-query - Protected endpoint to manually add a search query to the queue
router.post('/add-query', adminAuthMiddleware, async (req: Request, res: Response) => {
  const { searchQuery } = req.body;
  
  if (!searchQuery || typeof searchQuery !== 'string' || !searchQuery.trim()) {
    res.status(400).json({ success: false, message: 'Invalid or missing searchQuery' });
    return;
  }
  
  try {
    const insertRes = await pool.query(`
      INSERT INTO search_queries (query_string, status)
      VALUES ($1, 'pending')
      RETURNING *
    `, [searchQuery.trim()]);
    
    res.json({ success: true, message: 'Query added successfully', query: insertRes.rows[0] });
  } catch (error: any) {
    console.error('[SEO Routes] Error adding query:', error.message);
    if (error.code === '23505') { // postgres unique violation
      res.status(409).json({ success: false, message: 'Query already exists' });
      return;
    }
    res.status(500).json({ success: false, message: 'Failed to add query' });
  }
});

// GET /blog-posts - Public endpoint to retrieve dynamic database blog posts
router.get('/blog-posts', async (req: Request, res: Response) => {
  try {
    const postsRes = await pool.query(`
      SELECT id, title, content, slug, status, description, tags, created_at
      FROM blog_posts
      WHERE status = 'published'
      ORDER BY created_at DESC
    `);
    res.json({ success: true, posts: postsRes.rows });
  } catch (error: any) {
    console.error('[SEO Routes] Error fetching dynamic blog posts:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch dynamic blog posts' });
  }
});

// GET /blog-posts/:slug - Public endpoint to retrieve a single dynamic blog post by slug
router.get('/blog-posts/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const postRes = await pool.query(`
      SELECT id, title, content, slug, status, description, tags, created_at
      FROM blog_posts
      WHERE slug = $1 AND status = 'published'
      LIMIT 1
    `, [slug]);

    if (postRes.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }

    res.json({ success: true, post: postRes.rows[0] });
  } catch (error: any) {
    console.error('[SEO Routes] Error fetching single dynamic blog post:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch dynamic blog post' });
  }
});

export default router;
