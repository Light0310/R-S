const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/controllers/seoController.ts');
let content = fs.readFileSync(filePath, 'utf8');

const replacement = `
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const executeSearchIntegration = async (req: Request, res: Response) => {
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ message: 'No DATABASE_URL configured' });
  }
  try {
    const queryRes = await pool.query(
      'SELECT id, query_string FROM search_queries WHERE status = $1 LIMIT 1', 
      ['pending']
    );
    
    if (queryRes.rows.length === 0) {
      return res.status(404).json({ message: 'No pending search queries available.' });
    }
    
    const { id, query_string } = queryRes.rows[0];

    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
      throw new Error('SERPAPI_KEY environment variable is missing.');
    }

    let serpResponse = null;
    let retries = 0;
    const delays = [5000, 15000, 30000];

    while (retries <= delays.length) {
      try {
        serpResponse = await axios.get('https://serpapi.com/search', {
          params: {
            engine: 'google',
            q: query_string,
            api_key: apiKey,
          }
        });
        break; // Success, exit retry loop
      } catch (err: any) {
        console.error(\`[SEO Controller] SerpApi error on attempt \${retries + 1}:\`, err.message);
        if (retries < delays.length) {
          console.log(\`[SEO Controller] Retrying SerpApi in \${delays[retries] / 1000} seconds...\`);
          await sleep(delays[retries]);
          retries++;
        } else {
          // Mark as failed and skip so pipeline doesn't crash
          await pool.query('UPDATE search_queries SET status = $1 WHERE id = $2', ['failed', id]);
          return res.status(502).json({ message: 'SerpAPI rate limit or timeout. Max retries reached. Skipped task.', query: query_string });
        }
      }
    }

    if (!serpResponse) {
       return res.status(500).json({ message: 'Failed to fetch from SerpApi.' });
    }

    const organicResults = serpResponse.data.organic_results || [];
    
    if (organicResults.length === 0) {
       await pool.query('UPDATE search_queries SET status = $1 WHERE id = $2', ['no_results', id]);
       return res.status(200).json({ message: 'No organic results found for query', query: query_string });
    }

    let insertedCount = 0;
    for (const result of organicResults) {
      if (result.link) {
        const title = result.title || '';
        const snippet = result.snippet || '';
        
        try {
          await pool.query(
            'INSERT INTO link_targets (url, title, snippet, source_query_id) VALUES ($1, $2, $3, $4) ON CONFLICT (url) DO NOTHING',
            [result.link, title, snippet, id]
          );
          insertedCount++;
        } catch (dbErr) {
          console.error('[SEO Controller] DB Insert Error for URL:', result.link, dbErr);
        }
      }
    }

    await pool.query('UPDATE search_queries SET status = $1 WHERE id = $2', ['completed', id]);

    res.json({ 
      success: true, 
      message: \`Successfully processed query. Found \${organicResults.length} organic results.\`,
      inserted_links: insertedCount,
      query: query_string
    });
  } catch (error: any) {
    console.error('[SEO Controller] Error executing search integration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};`;

content = content.replace(/export const executeSearchIntegration = async.*?};/s, replacement.trim());

fs.writeFileSync(filePath, content);
console.log("Rewrote executeSearchIntegration successfully.");
