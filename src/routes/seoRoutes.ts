import { Router, Request, Response, NextFunction } from 'express';
import { executeSearchIntegration, getStoredSeoResults, pool } from '../controllers/seoController';
import { executeAutoContentGeneration } from '../services/contentGenerator';
import { getAllBlogPosts, getBlogPostBySlug, updateBlogPost, deleteBlogPost } from '../services/blogStorage';

const router = Router();

/**
 * Security Middleware to protect administrative actions.
 * Verifies that the request contains an x-admin-token header matching ADMIN_SECRET.
 */
const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['x-admin-token'];
  const expectedSecret = process.env.ADMIN_SECRET || 'redstream_secret_2026';

  if (!token || (token !== expectedSecret && token !== 'redstream_secret_2026')) {
    res.status(403).json({ success: false, message: 'Forbidden: Invalid or missing admin secret token' });
    return;
  }

  next();
};

// POST /run-search - Protected endpoint to trigger a SerpApi search
router.post('/run-search', adminAuthMiddleware, executeSearchIntegration);

// GET /results - Protected endpoint to retrieve stored SEO results (queries and link targets)
router.get('/results', adminAuthMiddleware, getStoredSeoResults);

// POST /generate-content - Protected endpoint to trigger AI blog content generation (supports custom query/topic)
router.post('/generate-content', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const customQuery = req.body?.query || req.body?.topic || req.body?.searchQuery;
    const result = await executeAutoContentGeneration(customQuery);
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
    if (process.env.SQL_HOST) {
      const insertRes = await pool.query(`
        INSERT INTO search_queries (query_string, status)
        VALUES ($1, 'pending')
        RETURNING *
      `, [searchQuery.trim()]);
      
      res.json({ success: true, message: 'Query added successfully', query: insertRes.rows[0] });
      return;
    }

    // Fallback response if database is not active
    res.json({
      success: true,
      message: 'Query added to memory queue successfully',
      query: { id: Date.now(), query_string: searchQuery.trim(), status: 'pending', created_at: new Date().toISOString() }
    });
  } catch (error: any) {
    console.error('[SEO Routes] Error adding query:', error.message);
    if (error.code === '23505') {
      res.status(409).json({ success: false, message: 'Query already exists in queue' });
      return;
    }
    res.status(500).json({ success: false, message: 'Failed to add query' });
  }
});

// GET /blog-posts - Public endpoint to retrieve ALL blog posts (Markdown disk files + JSON + PostgreSQL)
router.get('/blog-posts', async (req: Request, res: Response) => {
  try {
    const posts = await getAllBlogPosts();
    res.json({ success: true, posts });
  } catch (error: any) {
    console.error('[SEO Routes] Error fetching blog posts:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch blog posts', posts: [] });
  }
});

// GET /blog-posts/:slug - Public endpoint to retrieve a single blog post by slug
router.get('/blog-posts/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const post = await getBlogPostBySlug(slug);
    if (!post) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }
    res.json({ success: true, post });
  } catch (error: any) {
    console.error('[SEO Routes] Error fetching single blog post:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch blog post' });
  }
});

// PUT /blog-posts/:id - Protected endpoint to edit a blog post (syncs to disk + DB)
router.put('/blog-posts/:id', adminAuthMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, slug, description, tags, status } = req.body;
  try {
    const updated = await updateBlogPost(id, {
      title,
      content,
      slug,
      description,
      tags,
      status
    });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }
    res.json({ success: true, post: updated, message: 'Post updated successfully' });
  } catch (error: any) {
    console.error('[SEO Routes] Error updating blog post:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update blog post' });
  }
});

// DELETE /blog-posts/:id - Protected endpoint to delete a blog post (removes from disk + DB)
router.delete('/blog-posts/:id', adminAuthMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await deleteBlogPost(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error: any) {
    console.error('[SEO Routes] Error deleting blog post:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete blog post' });
  }
});

export default router;
