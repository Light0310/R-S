async function test() {
  try {
    const imageUrl = `https://image.pollinations.ai/prompt/a%20futuristic%20tv?width=1280&height=720&nologo=true`;
    console.log("Fetching", imageUrl);
    const imgResponse = await fetch(imageUrl);
    console.log("Response status:", imgResponse.status);
    if (imgResponse.ok) {
      const arrayBuffer = await imgResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      console.log("Success! Length:", base64Image.length);
    } else {
      console.log("Failed");
    }
  } catch (e) {
    console.log("Error:", e);
  }
}
test();
