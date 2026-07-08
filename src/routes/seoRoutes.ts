import { Router, Request, Response, NextFunction } from 'express';
import { executeSearchIntegration } from '../controllers/seoController';

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

export default router;
