import { GoogleGenAI, Type } from '@google/genai';
import { pool } from '../controllers/seoController';
import { saveBlogPost, getAllBlogPosts, BlogPostItem } from './blogStorage';

interface Snippet {
  url: string;
  title: string | null;
  snippet: string | null;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Curated high-converting IPTV SEO topics for instant generation
const CURATED_IPTV_TOPICS = [
  {
    topic: 'How to Fix IPTV Buffering and Freezing in 2026',
    slug: 'fix-iptv-buffering-freezing-guide',
    description: 'Stop buffering now. Learn the top tested technical fixes for IPTV lag, ISP throttling, buffer size tuning, and DNS optimization.',
    tags: ['buffering fix', 'iptv lag', 'troubleshooting', 'streaming guide']
  },
  {
    topic: 'Best IPTV Players for Android TV and Firestick (2026 Edition)',
    slug: 'best-iptv-players-android-tv-firestick',
    description: 'Compare the top IPTV player apps including TiviMate, IBO Player, IPTV Smarters Pro, and XCIPTV with setup recommendations.',
    tags: ['iptv players', 'tivimate', 'firestick', 'android tv']
  },
  {
    topic: 'Complete Guide to Setting Up IPTV on Apple TV and iOS',
    slug: 'setup-iptv-apple-tv-ios-guide',
    description: 'Step-by-step instructions to configure high-speed IPTV streaming on Apple TV 4K, iPhone, and iPad with zero stutter.',
    tags: ['apple tv', 'ios iptv', 'setup guide', '4k streaming']
  },
  {
    topic: 'IPTV vs Traditional Cable and Satellite: Cost and Performance Comparison',
    slug: 'iptv-vs-cable-satellite-comparison-2026',
    description: 'Discover why millions are switching to IPTV. Compare channel selections, 4K quality, sports coverage, and annual cost savings.',
    tags: ['cord cutting', 'iptv vs cable', 'streaming savings', 'live sports']
  },
  {
    topic: 'How to Watch Live Champions League and Premier League in 4K on IPTV',
    slug: 'watch-live-sports-champions-league-premier-league-iptv',
    description: 'The ultimate guide to streaming live Premier League, Champions League, La Liga, and UFC events in 60fps Ultra HD.',
    tags: ['live sports', 'premier league', 'champions league', '4k sports']
  }
];

export async function generateArticle(
  queryString: string,
  snippets: Snippet[] = [],
  recentArticles: { title: string; slug: string }[] = []
): Promise<{ title: string; content: string; slug: string; description: string; tags: string[] }> {
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    } catch (err: any) {
      console.warn('[Content Generator] Could not initialize Gemini client:', err.message);
    }
  }

  const cleanSlug = queryString
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  if (ai) {
    let retries = 0;
    const delays = [3000, 10000];

    while (retries <= delays.length) {
      try {
        console.log(`[Content Generator] Generating AI blog post with Gemini for: "${queryString}" (Attempt ${retries + 1})...`);
        
        const snippetsContext = snippets.length > 0
          ? snippets
              .map((s, i) => `Source ${i + 1}: ${s.title || 'No Title'} (${s.url})\nSnippet: ${s.snippet || 'No Content'}`)
              .join('\n\n')
          : 'Focus on modern streaming technology, ISP throttling bypass, network caching, player apps (TiviMate, IBO Player, IPTV Smarters), and RedStream 4K servers.';

        const recentArticlesContext = recentArticles.length > 0
          ? `\nRecent Articles to Interlink:\n` + recentArticles.map(a => `- "${a.title}" (URL: /blog/${a.slug})`).join('\n')
          : '';

        const prompt = `You are a World-Class Technical SEO Content Architect and Streaming Specialist.
Write a comprehensive, engaging, and in-depth blog post targeting the topic: "${queryString}".

Strict Guidelines:
1. Title: Catchy, authoritative, and SEO-friendly.
2. Structure: Use clear Markdown with one # Title, multiple ## Subheadings, ### Step-by-step guides, bullet points, and clean comparison tables where appropriate.
3. Tone: Professional, authoritative, actionable, and easy to read. Minimum 800-1200 words of rich content.
4. Value: Provide real technical steps, app names, DNS tips (1.1.1.1 / 8.8.8.8), buffer settings, and hardware recommendations.
5. Internal Links:${recentArticlesContext ? ` Insert 1-2 natural contextual internal links to these recent posts:${recentArticlesContext}` : ' (None)'}
6. RedStream IPTV Call to Action (CTA): Smoothly integrate a prominent CTA box at the end recommending RedStream IPTV (20,000+ live channels, 60,000+ VODs, 4K Ultra HD, Anti-Freeze 9.0 servers) with a direct link to claim a 24H Free Trial on WhatsApp: https://wa.me/212694843943?text=Hello%20RedStream,%20I%20read%20your%20guide%20and%20want%20a%20free%20trial.
7. Strict URL constraint: NEVER link to the root "/" or "/en/". All internal links must be to "/blog/slug".

Context:
${snippetsContext}

Output strictly valid JSON according to the schema.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: 'The optimized blog post headline.' },
                content: { type: Type.STRING, description: 'The complete blog post body in Markdown.' },
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
          title: articleData.title || `Ultimate Guide: ${queryString}`,
          content: articleData.content || generateFallbackContent(queryString, snippets),
          slug: (articleData.slug || cleanSlug).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          description: articleData.description || `Comprehensive guide on ${queryString}. Learn tips, tricks, and setup steps for uninterrupted 4K IPTV streaming.`,
          tags: articleData.tags && articleData.tags.length > 0 ? articleData.tags : ['iptv', 'streaming', 'guide', '4k']
        };
      } catch (error: any) {
        console.error(`[Content Generator] Gemini API error on attempt ${retries + 1}:`, error.message);
        if (retries < delays.length) {
          console.log(`[Content Generator] Retrying in ${delays[retries] / 1000} seconds...`);
          await sleep(delays[retries]);
          retries++;
        } else {
          console.error('[Content Generator] Max retries reached. Switching to high-quality fallback template.');
          break;
        }
      }
    }
  }

  // High-Quality Structured Fallback Template
  console.log(`[Content Generator] Generating expert fallback article for: "${queryString}"`);
  return {
    title: `How to Optimize ${queryString}: The Complete 2026 Guide`,
    content: generateFallbackContent(queryString, snippets),
    slug: cleanSlug,
    description: `Complete guide on ${queryString}. Discover the top technical solutions, recommended players, and network optimizations for 2026.`,
    tags: ['iptv', 'streaming guide', 'troubleshooting', 'smart tv', 'firestick']
  };
}

function generateFallbackContent(queryString: string, snippets: Snippet[] = []): string {
  const snippetBulletPoints = snippets.length > 0
    ? snippets
        .map(s => `* **${s.title || 'Technical Reference'}** — _${s.snippet || 'Key configuration details extracted from live streaming benchmarks.'}_`)
        .slice(0, 4)
        .join('\n')
    : `* **Connection Stability**: High-bitrate 4K streams require consistent throughput over raw peak speed.
* **Hardware Acceleration**: Use players that support hardware decoding (HW+) to reduce CPU throttling.
* **Buffer Cache Sizing**: Increase buffer size to 5–10 seconds in your player settings.`;

  return `# How to Master ${queryString} (Ultimate 2026 Guide)

Streaming entertainment has undergone a massive evolution, and mastering **${queryString}** is one of the most impactful ways to elevate your home viewing experience. Whether you are watching live sports, high-octane 4K movies, or international channels, having the right configuration prevents common headaches like stream buffering, audio de-sync, and ISP throttling.

---

## Key Technical Factors for Uninterrupted Streaming

To achieve pristine, broadcast-grade playback, several core variables must be aligned:

### 1. Network Latency & ISP Throttling
Many Internet Service Providers (ISPs) intentionally throttle high-bandwidth video streams during peak hours (such as major football derbies or pay-per-view events). 
* **Fix**: Use custom DNS settings such as Cloudflare DNS (\`1.1.1.1\`) or Google DNS (\`8.8.8.8\`) directly on your router or streaming device.

### 2. Wi-Fi vs. Wired Ethernet
While 5GHz Wi-Fi is fast, physical walls and radio interference can cause momentary packet loss that halts live video packets.
* **Fix**: Whenever possible, connect your Smart TV or Android box via Cat6 Ethernet.

---

## Expert Recommendations & Verified Solutions

Based on deep performance analysis:

${snippetBulletPoints}

---

## Step-by-Step Optimization Setup

| Step | Action | Recommended Configuration |
| :--- | :--- | :--- |
| **01** | **Player Selection** | Install TiviMate, IBO Player, or IPTV Smarters Pro |
| **02** | **Buffer Size** | Set buffer cache to **Medium / Large (5s - 10s)** |
| **03** | **Video Decoder** | Switch from Software (SW) to **Hardware (HW+)** |
| **04** | **DNS Optimization** | Set Primary DNS to \`1.1.1.1\` and Secondary to \`8.8.8.8\` |

---

## Why Choose RedStream IPTV for Zero-Lag Streaming?

Even the best configuration cannot compensate for an overloaded or unstable server. That is why **RedStream IPTV** is built on **Anti-Freeze 9.0 redundant cloud clusters** with dedicated European and global CDN nodes.

### What You Get with RedStream:
* ⚡ **20,000+ Live Global Channels** (Sports, News, Entertainment, PPV)
* 🎬 **60,000+ Blockbuster Movies & VOD Series** updated daily
* 📺 **Full HD, 4K & Ultra HD Streams** with 60fps sports channels
* 📱 **100% Compatibility**: Samsung & LG Smart TVs, Fire TV Stick, Android TV, Apple TV, PC & Mobile
* 🛡️ **99.9% Uptime SLA** with 24/7 dedicated customer assistance

---

### 🎁 Ready to Experience the Difference?

👉 **[Claim Your 24-Hour Free Trial on WhatsApp](https://wa.me/212694843943?text=Hello%20RedStream,%20I%20read%20your%20guide%20on%20${encodeURIComponent(queryString)}%20and%20want%20a%20free%20trial.)** — Set up in under 5 minutes with our support team!`;
}

/**
 * Main execution function to generate and permanently save an AI article.
 * Can take a custom keyword/topic or automatically pick from queue / curated topics.
 */
export async function executeAutoContentGeneration(customQuery?: string): Promise<{
  success: boolean;
  message: string;
  post?: BlogPostItem;
}> {
  try {
    let targetQuery = customQuery?.trim();
    let snippets: Snippet[] = [];
    let queryId: number | null = null;

    // If no custom query provided, attempt to pick from database
    if (!targetQuery && process.env.DATABASE_URL) {
      try {
        const client = await pool.connect();
        try {
          // 1. Try completed queries first
          const completedRes = await client.query(`
            SELECT sq.id, sq.query_string 
            FROM search_queries sq
            WHERE sq.status = 'completed'
            ORDER BY sq.id ASC
          `);

          const existingPosts = await getAllBlogPosts();
          const existingSlugs = new Set(existingPosts.map(p => p.slug));

          for (const row of completedRes.rows) {
            const slug = row.query_string.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            if (!existingSlugs.has(slug)) {
              targetQuery = row.query_string;
              queryId = row.id;
              break;
            }
          }

          // 2. If no completed fresh query, try pending queries
          if (!targetQuery) {
            const pendingRes = await client.query(`
              SELECT sq.id, sq.query_string 
              FROM search_queries sq
              WHERE sq.status = 'pending'
              ORDER BY sq.id ASC
              LIMIT 1
            `);
            if (pendingRes.rows.length > 0) {
              targetQuery = pendingRes.rows[0].query_string;
              queryId = pendingRes.rows[0].id;
              // Mark as completed
              await client.query(`UPDATE search_queries SET status = 'completed' WHERE id = $1`, [queryId]);
            }
          }

          // 3. If queryId found, fetch snippets
          if (queryId) {
            const snipsRes = await client.query(`
              SELECT url, title, snippet 
              FROM link_targets 
              WHERE source_query_id = $1
            `, [queryId]);
            snippets = snipsRes.rows;
          }
        } finally {
          client.release();
        }
      } catch (dbErr: any) {
        console.warn('[Content Generator] DB query warning:', dbErr.message);
      }
    }

    // If still no target query, pick from curated topics
    if (!targetQuery) {
      const existingPosts = await getAllBlogPosts();
      const existingSlugs = new Set(existingPosts.map(p => p.slug));
      
      const unusedCurated = CURATED_IPTV_TOPICS.find(t => !existingSlugs.has(t.slug));
      if (unusedCurated) {
        targetQuery = unusedCurated.topic;
      } else {
        targetQuery = `Best IPTV Setup and Streaming Guide ${new Date().getFullYear()}`;
      }
    }

    // Get recent articles for interlinking
    const existingPosts = await getAllBlogPosts();
    const recentArticles = existingPosts.slice(0, 3).map(p => ({ title: p.title, slug: p.slug }));

    // Generate the article
    const generated = await generateArticle(targetQuery, snippets, recentArticles);

    // Save permanently to Disk Markdown + JSON + PostgreSQL
    const savedPost = await saveBlogPost({
      title: generated.title,
      slug: generated.slug,
      content: generated.content,
      description: generated.description,
      tags: generated.tags,
      author: 'RedStream Expert',
      status: 'published'
    });

    return {
      success: true,
      message: `Successfully generated and published article: "${savedPost.title}" (/en/blog/${savedPost.slug})`,
      post: savedPost
    };
  } catch (error: any) {
    console.error('[Content Generator] Error during generation execution:', error);
    return {
      success: false,
      message: error.message || 'Unknown error occurred during content generation.'
    };
  }
}
