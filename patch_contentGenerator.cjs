const fs = require('fs');

let content = fs.readFileSync('src/services/contentGenerator.ts', 'utf-8');

// We need to inject `generateUniqueSeoTopic` and use it in `executeAutoContentGeneration`.

// First, inject the function before executeAutoContentGeneration
const uniqueTopicFunc = `
async function generateUniqueSeoTopic(existingTitles: string[]): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = \`
You are an expert SEO strategist in the IPTV, Streaming, and Cord-Cutting niche.
Your task is to generate a HIGHLY UNIQUE, highly searched, low-competition blog post topic (keyword).

IMPORTANT: You must NOT generate any topic that overlaps with the following existing articles:
\${existingTitles.map(t => '- ' + t).join('\\n')}

Return ONLY the topic string, nothing else. Example: "How to fix IPTV buffering on Firestick 2026"
    \`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });
    return response.text?.trim() || 'Ultimate Guide to 4K IPTV Streaming 2026';
  } catch (error) {
    console.error('Error generating unique topic:', error);
    return 'Best Streaming Devices for 4K IPTV 2026';
  }
}
`;

content = content.replace('export async function executeAutoContentGeneration', uniqueTopicFunc + '\nexport async function executeAutoContentGeneration');

// Now, update executeAutoContentGeneration logic to use it if !targetQuery
const searchQueriesLogic = `    // If still no target query, pick from curated topics
    if (!targetQuery) {
      const existingPosts = await getAllBlogPosts();
      const existingSlugs = new Set(existingPosts.map(p => p.slug));
      
      const unusedCurated = CURATED_IPTV_TOPICS.find(t => !existingSlugs.has(t.slug));
      if (unusedCurated) {
        targetQuery = unusedCurated.topic;
      } else {
        targetQuery = \`Best IPTV Setup and Streaming Guide \${new Date().getFullYear()}\`;
      }
    }`;

const replaceSearchQueriesLogic = `    // If no target query, generate a strictly unique SEO topic
    if (!targetQuery) {
      const existingPosts = await getAllBlogPosts();
      const existingTitles = existingPosts.map(p => p.title);
      targetQuery = await generateUniqueSeoTopic(existingTitles);
      console.log('[Content Generator] Generated unique SEO topic:', targetQuery);
    }`;

content = content.replace(searchQueriesLogic, replaceSearchQueriesLogic);

// Also modify the prompt in generateArticle to improve SEO
content = content.replace(
  "1. Title: Catchy, authoritative, and SEO-friendly.",
  "1. Title: Highly engaging, click-worthy, and SEO-optimized (include power words and year if relevant)."
);
content = content.replace(
  "3. Tone: Professional, authoritative, actionable, and easy to read. Minimum 800-1200 words of rich content.",
  "3. SEO & Formatting: Professional, authoritative, actionable. Minimum 800-1200 words. Include NLP keywords (e.g., buffering, latency, firestick, 4k, m3u, lag-free). Use bold text for key terms. Add a FAQ section at the end for Google Featured Snippets."
);

fs.writeFileSync('src/services/contentGenerator.ts', content);
