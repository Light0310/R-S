const fs = require('fs');

let content = fs.readFileSync('src/services/contentGenerator.ts', 'utf-8');

// Replace the prompt string in generateArticle
const oldPromptPattern = /const prompt = \`You are a World-Class Technical SEO Content Architect[\s\S]*?Output strictly valid JSON according to the schema\.\`;/;

const newPrompt = `const prompt = \`
You are a World-Class Technical SEO Content Architect and Streaming Specialist writing for a human audience.
Write a comprehensive, engaging, and highly unique blog post targeting the topic: "\${queryString}".

Strict Guidelines:
1. Tone & Style: STRICTLY HUMAN, conversational, and relatable. Use first-person plural ("we") or second-person ("you"). Avoid generic AI openings ("In the rapidly evolving world of...", "In today's digital age"). Avoid robotic transitions ("Furthermore", "Moreover", "In conclusion"). Use analogies, storytelling, and real-world scenarios to avoid repeating previous content structures.
2. Sources & Reliability: Ground your article in REAL facts, current events, true technical specifications, and reliable data. Do not repeat the same generic IPTV advice over and over. Introduce unique angles, recent device updates, and actual networking facts.
3. Structure: Use clear Markdown with one # Title, multiple ## Subheadings, and ### for deep dives. Include a FAQ section at the end for Google Featured Snippets.
4. Content Depth: Write at least 800-1200 words. Do NOT repeat the same paragraphs in different words. Each section must provide distinct, actionable value.
5. Value: Provide real technical steps, app names, DNS tips (1.1.1.1 / 8.8.8.8), buffer settings, and hardware recommendations.
6. Internal Links:\${recentArticlesContext ? \` Insert 1-2 natural contextual internal links to these recent posts:\${recentArticlesContext}\` : ' (None)'}
7. RedStream Call to Action (CTA): Smoothly integrate a CTA box at the end recommending RedStream (Premium servers, 4K Ultra HD) with a link to claim a 24H Free Trial on WhatsApp: https://wa.me/212694843943?text=Hello%20RedStream,%20I%20read%20your%20guide%20and%20want%20a%20free%20trial.
8. Safety: Never use "Piracy" directly. Refer to "Premium Streaming Solutions", "Private Server Hosting".

Context (if any):
\${snippetsContext}

Output strictly valid JSON according to the schema.\`;`;

content = content.replace(oldPromptPattern, newPrompt);

// Now inject googleSearch into the config object for generateArticle
const oldConfig = `config: {
            responseMimeType: 'application/json',
            responseSchema: {`;

const newConfig = `config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: 'application/json',
            responseSchema: {`;

content = content.replace(oldConfig, newConfig);

// And inject googleSearch into generateUniqueSeoTopic
const oldConfigTopic = `config: {
        temperature: 0.9,
      }`;
const newConfigTopic = `config: {
        temperature: 0.9,
        tools: [{ googleSearch: {} }],
      }`;

content = content.replace(oldConfigTopic, newConfigTopic);

fs.writeFileSync('src/services/contentGenerator.ts', content);
console.log('Patched contentGenerator.ts successfully.');
