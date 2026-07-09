import { GoogleGenAI, Type } from '@google/genai';
import { pool } from '../controllers/seoController';

// Initialize Gemini Client
const getGeminiClient = (): GoogleGenAI | null => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[Content Generator] GEMINI_API_KEY is not defined. AI content generation will fallback to structured mockup template.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

interface Snippet {
  url: string;
  title: string | null;
  snippet: string | null;
}

/**
 * Generates an SEO-optimized blog post based on search query and associated snippets.
 * Falls back to a high-quality mockup generator if GEMINI_API_KEY is not set.
 */
export async function generateArticle(
  queryId: number,
  queryString: string,
  snippets: Snippet[]
): Promise<{ title: string; content: string; slug: string; description: string; tags: string[] }> {
  const ai = getGeminiClient();

  if (ai) {
    try {
      console.log(`[Content Generator] Generating dynamic AI blog post for: "${queryString}" using Gemini...`);
      
      const snippetsContext = snippets
        .map((s, i) => `Source ${i + 1}: ${s.title || 'No Title'} (${s.url})\nSnippet: ${s.snippet || 'No Content'}`)
        .join('\n\n');

      const prompt = `Act as an Expert SEO Content Writer and IPTV Technology Specialist.
Your task is to write a highly engaging, SEO-optimized blog post targeting the exact search query: "${queryString}".
Follow these strict guidelines to ensure high ranking and user engagement:
Structure: Start with a catchy, click-worthy H1 title. Use clear, logically ordered H2 and H3 subheadings.
Introduction: Hook the reader in the first sentence. Acknowledge their problem or intent right away.
Value First: Provide accurate, step-by-step information related to the query (e.g., app setup, troubleshooting). Use bullet points and bold text to make it easy to skim.
Natural CTA: Seamlessly integrate a recommendation for RedStream IPTV as the ultimate, premium solution for stable, 4K streaming. Do not sound aggressive or spammy; weave it in as a helpful, expert tip within the context of the article.
Conclusion: Summarize the main takeaway briefly.
Formatting: Output the entire response in clean Markdown format without any conversational filler.

Additional Context for generation:
We have gathered some top search results for this query to serve as factual context:
${snippetsContext}

Please provide your response strictly conforming to the requested JSON schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'The optimized blog post headline.' },
              content: { type: Type.STRING, description: 'The complete blog post body in Markdown, including clear sections and the RedStream IPTV CTA.' },
              slug: { type: Type.STRING, description: 'A lowercase, hyphen-separated url-friendly string.' },
              description: { type: Type.STRING, description: 'Compelling SEO meta description (140-160 chars).' },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 to 5 highly relevant SEO tags/categories.'
              }
            },
            required: ['title', 'content', 'slug', 'description', 'tags']
          }
        }
      });

      const dataStr = response.text?.trim() || '';
      const articleData = JSON.parse(dataStr);
      
      return {
        title: articleData.title || `How to Optimize ${queryString}`,
        content: articleData.content || `Article content for ${queryString}`,
        slug: articleData.slug || queryString.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: articleData.description || `Read our ultimate guide on ${queryString} for premium IPTV streaming.`,
        tags: articleData.tags || ['iptv', 'streaming', 'guide']
      };

    } catch (error: any) {
      console.error('[Content Generator] Gemini API error, falling back to structured template generator:', error.message);
    }
  }

  // Structured High-Quality fallback template
  console.log(`[Content Generator] Generating fallback template article for: "${queryString}"`);
  const cleanSlug = queryString.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const snippetBulletPoints = snippets
    .map(s => `* **${s.title || 'Streaming Guide'}** - Insights from reference: _${s.snippet || 'No specific snippet information extracted.'}_`)
    .slice(0, 4)
    .join('\n');

  const contentMarkdown = `## Understanding the Challenge: ${queryString}

If you have been looking for clear answers on **${queryString}**, you are in the right place. Fast, reliable streaming is no longer a luxury—it is an absolute necessity. Whether you are setting up a Smart TV, an Android TV box, or seeking live sporting broadcasts, understanding how to configure your home network is key to unlocking the best streaming quality.

### Top Expert Solutions & Insights

Based on our SEO target analysis and competitor lookup, here are the most effective tactics to implement:

${snippetBulletPoints || '* Make sure you use a high-speed, stable connection (Ethernet is preferred over Wi-Fi).\n* Clear your app caches regularly to prevent sluggish rendering.'}

### Recommended Network Optimizations
1. **Switch to 5GHz Wi-Fi or Ethernet**: 2.4GHz bands are often congested. An Ethernet connection provides a direct, uninterrupted route.
2. **Configure Custom DNS Server**: Switching to Cloudflare (1.1.1.1) or Google Public DNS (8.8.8.8) can bypass standard ISP routing blockages and improve latency.
3. **Use a Reliable App Player**: Make sure your Smart TV has the latest firmware updates to process raw MPEG-TS video codecs efficiently.

---

### Tired of Constant Buffering & Low-Quality Streams?

No matter how many configurations you tweak, your stream is only as good as your server. If you want a pristine, uninterrupted entertainment experience:

🎁 **Claim Your 24-Hour Premium IPTV Free Trial Now!**

Join **RedStream IPTV** and enjoy:
* **20,000+ Live Global Channels** in Full HD and Crystal-Clear 4K
* **Super-Fast Anti-Freezing Servers** with 99.9% uptime
* **24/7 dedicated customer assistance** for Android, iOS, Smart TV, and Firestick

👉 [Claim Your Free Trial Instantly on WhatsApp](https://wa.me/212694843943?text=Hello%20RedStream,%20I%20read%20your%20article%20on%20${encodeURIComponent(queryString)}%20and%20want%20a%20free%20trial.) to get set up in under 5 minutes!
`;

  return {
    title: `Ultimate Guide: ${queryString}`,
    content: contentMarkdown,
    slug: cleanSlug,
    description: `Tired of lag? Discover our ultimate guide on "${queryString}" to optimize your streaming setup and get the best performance in 2026.`,
    tags: ['iptv', 'streaming setup', 'buffering fix', 'cord-cutting']
  };
}

/**
 * Executes content generation for the first available COMPLETED query 
 * that hasn't been generated as a blog post yet.
 */
export async function executeAutoContentGeneration(): Promise<{ success: boolean; message: string; post?: any }> {
  const client = await pool.connect();
  try {
    // 1. Fetch completed search queries that don't already have an entry in blog_posts
    // (We match by query slug or keep it simple by fetching any completed query)
    const completedQueriesRes = await client.query(`
      SELECT sq.id, sq.query_string 
      FROM search_queries sq
      WHERE sq.status = 'completed'
      AND NOT EXISTS (
        SELECT 1 FROM blog_posts bp WHERE bp.slug = LOWER(REGEXP_REPLACE(sq.query_string, '[^a-zA-Z0-9]+', '-', 'g'))
      )
      LIMIT 1
    `);

    if (completedQueriesRes.rows.length === 0) {
      return { 
        success: false, 
        message: 'No un-written COMPLETED search queries found in database. Please run the SEO Search Engine first to complete a query.' 
      };
    }

    const { id: queryId, query_string: queryString } = completedQueriesRes.rows[0];

    // 2. Fetch all associated snippets for this query
    const snippetsRes = await client.query(`
      SELECT url, title, snippet 
      FROM link_targets 
      WHERE source_query_id = $1
    `, [queryId]);

    const snippets = snippetsRes.rows;

    // 3. Generate article (via Gemini or high-quality fallback)
    const article = await generateArticle(queryId, queryString, snippets);

    // 4. Save into blog_posts table in PostgreSQL
    const insertRes = await client.query(`
      INSERT INTO blog_posts (title, content, slug, status, description, tags)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (slug) DO UPDATE 
      SET title = EXCLUDED.title, content = EXCLUDED.content, description = EXCLUDED.description, tags = EXCLUDED.tags
      RETURNING id, title, slug, status, created_at
    `, [
      article.title, 
      article.content, 
      article.slug, 
      'published', 
      article.description, 
      article.tags
    ]);

    const savedPost = insertRes.rows[0];

    return {
      success: true,
      message: `Successfully generated and saved blog post: "${article.title}"`,
      post: savedPost
    };

  } catch (error: any) {
    console.error('[Content Generator] Error during generation execution:', error.message);
    return {
      success: false,
      message: error.message || 'Unknown error occurred during content generation.'
    };
  } finally {
    client.release();
  }
}
