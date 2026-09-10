const { GoogleGenAI, Type } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'What is the current version of React? Return as JSON with a "version" field.',
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          version: { type: Type.STRING }
        }
      }
    }
  });
  console.log(response.text);
}

run().catch(console.error);
