import { GoogleGenAI } from '@google/genai';

async function testImage() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    console.log("Generating image...");
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: {
        parts: [{ text: `A highly realistic, photorealistic, unedited, cinematic 4k stock photography of: Test Query.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      }
    });
    console.log("Response candidates:", JSON.stringify(imageResponse.candidates?.map(c => c.content?.parts?.map(p => Object.keys(p))), null, 2));
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}
testImage();
