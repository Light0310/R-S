import { generateArticle } from './src/services/contentGenerator.ts';

async function run() {
  console.log("Generating article...");
  const result = await generateArticle("test image final three");
  console.log("Cover image exists?", !!result.cover_image);
  if (result.cover_image) {
    console.log("Length:", result.cover_image.length);
  }
}

run().catch(console.error);
