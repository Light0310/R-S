import cron from 'node-cron';
import axios from 'axios';
import { pool } from '../controllers/seoController';

// Concurrency lock to prevent race conditions and overlapping executions
let isJobRunning = false;

/**
 * Core processing function to fetch and execute the next pending SEO search query.
 */
async function processNextPendingQuery(): Promise<{ processed: boolean; query?: string; insertedCount?: number; error?: string }> {
  const client = await pool.connect();
  try {
    // 1. Fetch the next pending search query
    const queryRes = await client.query(
      'SELECT id, query_string FROM search_queries WHERE status = $1 LIMIT 1',
      ['pending']
    );

    if (queryRes.rows.length === 0) {
      return { processed: false };
    }

    const { id, query_string } = queryRes.rows[0];

    // 2. Load API key securely
    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
      throw new Error('SERPAPI_KEY environment variable is missing.');
    }

    console.log(`[SEO Cron] Executing Google Search via SerpApi for query: "${query_string}"`);

    // 3. Request SerpApi
    const serpResponse = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google',
        q: query_string,
        api_key: apiKey,
      },
      timeout: 15000, // 15s timeout safeguard
    });

    const organicResults = serpResponse.data.organic_results || [];

    if (organicResults.length === 0) {
      await client.query('UPDATE search_queries SET status = $1 WHERE id = $2', ['no_results', id]);
      return { processed: true, query: query_string, insertedCount: 0 };
    }

    // 4. Write organic results inside a database transaction
    let insertedCount = 0;
    await client.query('BEGIN');
    
    try {
      for (const result of organicResults) {
        const { link, title, snippet } = result;
        if (!link) continue;

        const insertQuery = `
          INSERT INTO link_targets (url, title, snippet, source_query_id)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (url) DO NOTHING
        `;
        const insertRes = await client.query(insertQuery, [link, title, snippet, id]);
        if (insertRes.rowCount && insertRes.rowCount > 0) {
          insertedCount++;
        }
      }

      await client.query('UPDATE search_queries SET status = $1 WHERE id = $2', ['completed', id]);
      await client.query('COMMIT');
    } catch (transactionError) {
      await client.query('ROLLBACK');
      throw transactionError;
    }

    return { processed: true, query: query_string, insertedCount };
  } catch (error: any) {
    return { processed: false, error: error.message };
  } finally {
    client.release();
  }
}

/**
 * Initializes and starts the background cron job scheduler.
 */
export function initCronScheduler() {
  console.log('[SEO Cron] Initializing automatic SEO cron job scheduler (Interval: Every 6 hours)...');

  // Schedule task to run every 6 hours (0 */6 * * *)
  cron.schedule('0 */6 * * *', async () => {
    // CRITICAL GUARD: Check if previous SEO task is still running
    if (isJobRunning) {
      console.warn('[SEO Cron] Job skipped - previous task still running');
      return;
    }

    // Set lock
    isJobRunning = true;
    console.log('[SEO Cron] Automated SEO task started...');

    try {
      const result = await processNextPendingQuery();
      
      if (result.error) {
        console.error(`[SEO Cron] Automated SEO task failed with error: ${result.error}`);
      } else if (result.processed) {
        console.log(
          `[SEO Cron] Automated SEO task completed successfully. Query processed: "${result.query}". New URLs inserted: ${result.insertedCount}.`
        );
      } else {
        console.log('[SEO Cron] Automated SEO task finished: No pending queries found in the queue.');
      }
    } catch (err: any) {
      console.error(`[SEO Cron] Unexpected error during scheduled cron run: ${err.message}`);
    } finally {
      // Release lock
      isJobRunning = false;
    }
  });

  console.log('[SEO Cron] Background scheduler is now active and running in the background.');
}
