const fs = require('fs');
const path = require('path');

const content = `import { getGeminiClient } from '../utils/geminiClient';
import { Type } from '@google/genai';
import { pool } from '../controllers/seoController';

interface Snippet {
  url: string;
  title: string | null;
  snippet: string | null;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateArticle(
  queryId: number,
  queryString: string,
  snippets: Snippet[],
  recentArticles: { title: string; slug: string }[] = []
): Promise<{ title: string; content: string; slug: string; description: string; tags: string[] }> {
  const ai = getGeminiClient();

  if (ai) {
    let retries = 0;
    const delays = [5000, 15000, 30000]; // 5s, 15s, 30s exponential backoff

    while (retries <= delays.length) {
      try {
        console.log(\`[Content Generator] Generating AI blog post for: "\${queryString}" (Attempt \${retries + 1})...\`);
        
        const snippetsContext = snippets
          .map((s, i) => \`Source \${i + 1}: \${s.title || 'No Title'} (\${s.url})\\nSnippet: \${s.snippet || 'No Content'}\`)
          .join('\\n\\n');

        const recentArticlesContext = recentArticles.length > 0
          ? \`\\nRecent Articles to Interlink:\\n\` + recentArticles.map(a => \`- "\${a.title}" (URL: /blog/\${a.slug})\`).join('\\n')
          : '';

        const prompt = \`Act as an Autonomous Programmatic SEO Master Agent & Senior Content Architect.
Your task is to write a highly engaging, SEO-optimized blog post targeting the exact search query: "\${queryString}".

Strict Content Generation & Safety Rules:
1. Keyword Density: Maintain a strict natural keyword density of 1.2% to 1.8%. Never spam or force keywords.
2. Semantic HTML & Structure: Use clean semantic HTML/Markdown structure: one H1 title, clear H2/H3 subheadings.
3. Readability: Use short, readable paragraphs (maximum 3-4 sentences per paragraph).
4. LSI Keywords: Use LSI keywords and synonyms naturally instead of robotic repetition.
5. CTA Integration: Smoothly integrate the RedStream IPTV Call to Action (CTA) naturally at the conclusion or within context. Do not be overly aggressive.
6. Dynamic Interlinking Protocol:\${recentArticlesContext ? \` Insert 1 to 2 contextual internal links pointing to these recent articles using descriptive anchor texts relevant to the paragraph:\${recentArticlesContext}\` : ' (No recent articles available to interlink right now).'}

Context from top search results:
\${snippetsContext}

Please output strictly conforming to the requested JSON schema without any conversational filler.\`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: 'The optimized blog post headline.' },
                content: { type: Type.STRING, description: 'The complete blog post body in Markdown, including clear sections, internal links, and the RedStream IPTV CTA.' },
                slug: { type: Type.STRING, description: 'A lowercase, hyphen-separated url-friendly string.' },
                description: { type: Type.STRING, description: 'Compelling SEO meta description (140-160 chars).' },
                tags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '3 to 5 highly relevant SEO tags.'
                }
              },
              required: ['title', 'content', 'slug', 'description', 'tags']
            }
          }
        });

        const dataStr = response.text?.trim() || '';
        const articleData = JSON.parse(dataStr);
        
        return {
          title: articleData.title || \`How to Optimize \${queryString}\`,
          content: articleData.content || \`Article content for \${queryString}\`,
          slug: articleData.slug || queryString.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          description: articleData.description || \`Read our ultimate guide on \${queryString} for premium IPTV streaming.\`,
          tags: articleData.tags || ['iptv', 'streaming', 'guide']
        };
      } catch (error: any) {
        console.error(\`[Content Generator] Gemini API error on attempt \${retries + 1}:\`, error.message);
        if (retries < delays.length) {
          console.log(\`[Content Generator] Retrying in \${delays[retries] / 1000} seconds...\`);
          await sleep(delays[retries]);
          retries++;
        } else {
          console.error('[Content Generator] Max retries reached. Failing gracefully.');
          break; // Break to fallback
        }
      }
    }
  }

  // Structured High-Quality fallback template
  console.log(\`[Content Generator] Generating fallback template article for: "\${queryString}"\`);
  const cleanSlug = queryString.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const snippetBulletPoints = snippets
    .map(s => \`* **\${s.title || 'Streaming Guide'}** - Insights from reference: _\${s.snippet || 'No specific snippet information extracted.'}_\`)
    .slice(0, 4)
    .join('\\n');

  const contentMarkdown = \`## Understanding the Challenge: \${queryString}

If you have been looking for clear answers on **\${queryString}**, you are in the right place. Fast, reliable streaming is no longer a luxury—it is an absolute necessity. Whether you are setting up a Smart TV, an Android TV box, or seeking live sporting broadcasts, understanding how to configure your home network is key to unlocking the best streaming quality.

### Top Expert Solutions & Insights

Based on our SEO target analysis and competitor lookup, here are the most effective tactics to implement:

\${snippetBulletPoints || '* Make sure you use a high-speed, stable connection (Ethernet is preferred over Wi-Fi).\\n* Clear your app caches regularly to prevent sluggish rendering.'}

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

👉 [Claim Your Free Trial Instantly on WhatsApp](https://wa.me/212694843943?text=Hello%20RedStream,%20I%20read%20your%20article%20on%20\${encodeURIComponent(queryString)}%20and%20want%20a%20free%20trial.) to get set up in under 5 minutes!\`;

  return {
    title: \`Ultimate Guide: \${queryString}\`,
    content: contentMarkdown,
    slug: cleanSlug,
    description: \`Tired of lag? Discover our ultimate guide on "\${queryString}" to optimize your streaming setup and get the best performance in 2026.\`,
    tags: ['iptv', 'streaming setup', 'buffering fix', 'cord-cutting']
  };
}

export async function executeAutoContentGeneration(): Promise<{ success: boolean; message: string; post?: any }> {
  const client = await pool.connect();
  try {
    // 1. Fetch ALL completed search queries
    const completedQueriesRes = await client.query(\`
      SELECT sq.id, sq.query_string 
      FROM search_queries sq
      WHERE sq.status = 'completed'
      ORDER BY sq.id ASC
    \`);

    if (completedQueriesRes.rows.length === 0) {
      return { 
        success: false, 
        message: 'No COMPLETED search queries found in database. Please run the SEO Search Engine first to complete a query.' 
      };
    }

    // Duplicate Prevention & Pre-Flight Check:
    let selectedQuery = null;
    for (const row of completedQueriesRes.rows) {
      const slug = row.query_string.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const existsRes = await client.query(\`SELECT 1 FROM blog_posts WHERE slug = $1 LIMIT 1\`, [slug]);
      
      if (existsRes.rows.length > 0) {
        console.log(\`[Content Generator] Duplicate Skipped: "\${row.query_string}" already exists as an article. Moving to next fresh keyword...\`);
        continue; // Move to next
      } else {
        selectedQuery = row;
        break; // Found a fresh keyword
      }
    }

    if (!selectedQuery) {
       return { 
        success: false, 
        message: 'All completed queries have already been generated into blog posts (Duplicates Skipped).' 
      };
    }

    const { id: queryId, query_string: queryString } = selectedQuery;

    // 2. Fetch all associated snippets for this query
    const snippetsRes = await client.query(\`
      SELECT url, title, snippet 
      FROM link_targets 
      WHERE source_query_id = $1
    \`, [queryId]);
    const snippets = snippetsRes.rows;

    // Fetch last 3-5 published articles for dynamic interlinking
    const recentArticlesRes = await client.query(\`
      SELECT title, slug 
      FROM blog_posts 
      WHERE status = 'published' 
      ORDER BY created_at DESC 
      LIMIT 3
    \`);
    const recentArticles = recentArticlesRes.rows;

    // 3. Generate article (via Gemini or high-quality fallback)
    const article = await generateArticle(queryId, queryString, snippets, recentArticles);

    // 4. Save into blog_posts table in PostgreSQL
    const insertRes = await client.query(\`
      INSERT INTO blog_posts (title, content, slug, status, description, tags)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (slug) DO UPDATE 
      SET title = EXCLUDED.title, content = EXCLUDED.content, description = EXCLUDED.description, tags = EXCLUDED.tags
      RETURNING id, title, slug, status, created_at
    \`, [
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
      message: \`Successfully generated and saved blog post: "\${article.title}"\`,
      post: savedPost
    };
  } catch (error: any) {
    console.error('[Content Generator] Error during generation execution:', error.message);
    // Safe failure logging
    return {
      success: false,
      message: error.message || 'Unknown error occurred during content generation.'
    };
  } finally {
    client.release();
  }
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/services/contentGenerator.ts'), content);
console.log("Rewritten contentGenerator.ts successfully.");
