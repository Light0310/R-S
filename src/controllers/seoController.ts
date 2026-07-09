import { Request, Response } from 'express';
import { Pool } from 'pg';
import axios from 'axios';

// Initialize PostgreSQL connection pool
// In a production architecture, this pool is typically exported from a dedicated /db/config.ts file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Automatically initializes database tables and seeds sample data if empty.
 */
export const initializeDatabase = async () => {
  if (!process.env.DATABASE_URL) {
    console.warn('[Database] DATABASE_URL is missing. Database tables will not be automatically initialized.');
    return;
  }

  try {
    console.log('[Database] Initializing PostgreSQL tables...');
    
    // Create search_queries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS search_queries (
        id SERIAL PRIMARY KEY,
        query_string TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending' NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create link_targets table with a UNIQUE constraint on url
    await pool.query(`
      CREATE TABLE IF NOT EXISTS link_targets (
        id SERIAL PRIMARY KEY,
        url TEXT UNIQUE NOT NULL,
        title TEXT,
        snippet TEXT,
        source_query_id INT REFERENCES search_queries(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if search_queries is empty, if so, seed some sample queries
    const checkRes = await pool.query('SELECT COUNT(*) FROM search_queries');
    const count = parseInt(checkRes.rows[0].count, 10);
    
    if (count === 0) {
      console.log('[Database] Seeding sample search queries into search_queries...');
      const sampleQueries = [
        'vibe coding seo mastermind',
        'programmatic seo best practices',
        'render node.js fast deployments',
        'google search indexing optimization'
      ];
      
      for (const query of sampleQueries) {
        await pool.query(
          'INSERT INTO search_queries (query_string, status) VALUES ($1, $2)',
          [query, 'pending']
        );
      }
      console.log(`[Database] Seeded ${sampleQueries.length} sample search queries.`);
    }

    console.log('[Database] Initialization completed successfully.');
  } catch (error: any) {
    console.error('[Database] Error initializing database tables:', error.message);
  }
};

/**
 * Controller to fetch a pending SEO query, execute a SerpApi search, 
 * and store the organic results efficiently in PostgreSQL.
 */
export const executeSearchIntegration = async (req: Request, res: Response) => {
  try {
    // 1. Read a standard search query string from our PostgreSQL database
    const queryRes = await pool.query(
      'SELECT id, query_string FROM search_queries WHERE status = $1 LIMIT 1', 
      ['pending']
    );
    
    if (queryRes.rows.length === 0) {
      return res.status(404).json({ message: 'No pending search queries available.' });
    }
    
    const { id, query_string } = queryRes.rows[0];

    // 2. Make a standard GET request to SerpApi securely loading the key from process.env
    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
      throw new Error('SERPAPI_KEY environment variable is missing.');
    }

    const serpResponse = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google',
        q: query_string,
        api_key: apiKey,
      }
    });

    // 3. Parse the JSON response to extract the URLs from organic results
    const organicResults = serpResponse.data.organic_results || [];
    
    if (organicResults.length === 0) {
       await pool.query('UPDATE search_queries SET status = $1 WHERE id = $2', ['no_results', id]);
       return res.status(200).json({ message: 'No organic results found for query', query: query_string });
    }

    // 4. Save these URLs into our PostgreSQL table using ON CONFLICT DO NOTHING
    let insertedCount = 0;
    
    // Using a database transaction for bulk insert efficiency and safety
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
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
      
      // Mark the query as completed after successful insertion
      await client.query('UPDATE search_queries SET status = $1 WHERE id = $2', ['completed', id]);
      
      await client.query('COMMIT');
    } catch (dbError) {
      await client.query('ROLLBACK');
      throw dbError;
    } finally {
      client.release();
    }

    return res.status(200).json({
      message: 'SEO data gathered and stored successfully',
      query: query_string,
      resultsParsed: organicResults.length,
      newUrlsInserted: insertedCount
    });

  } catch (error: any) {
    // 5. Standard try...catch error handling to gracefully manage API rate limits (e.g. 429)
    console.error('[SEO Controller] Error executing search integration:', error.message);
    
    if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        return res.status(status).json({
            message: 'SerpApi request failed',
            status: status,
            details: error.response.data
        });
    }

    return res.status(500).json({
      message: 'Internal server error during search integration',
      error: error.message
    });
  }
};
