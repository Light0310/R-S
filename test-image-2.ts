import { GoogleGenAI } from '@google/genai';

async function testImage() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    console.log("Generating image with gemini-3.1-flash-lite-image...");
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: `A photorealistic image of a cat.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });
    if (imageResponse.candidates && imageResponse.candidates[0]?.content?.parts) {
      console.log("SUCCESS!");
    } else {
      console.log("NO CANDIDATES", JSON.stringify(imageResponse, null, 2));
    }
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}
testImage();
