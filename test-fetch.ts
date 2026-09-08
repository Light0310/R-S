const imagePrompt = `A highly realistic, photorealistic, cinematic 4k stock photography of: Test image final twice. Do NOT include any text, letters, or illustrations.`;
const encodedPrompt = encodeURIComponent(imagePrompt);
const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&nologo=true`;

console.log("Fetching:", imageUrl);
fetch(imageUrl).then(res => {
  console.log("Status:", res.status);
  return res.arrayBuffer();
}).then(ab => {
  console.log("Size:", ab.byteLength);
}).catch(console.error);
