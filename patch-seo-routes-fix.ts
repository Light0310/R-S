import fs from 'fs';
let content = fs.readFileSync('src/routes/seoRoutes.ts', 'utf-8');

const startIdx = content.indexOf("router.get('/images/:slug.jpg'");
const endIdx = content.indexOf("});", content.indexOf("res.end(imgBuffer);")) + 3;

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `router.get('/images/:slug.jpg', async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const post = await getBlogPostBySlug(slug);
    if (!post || !post.cover_image) {
      res.status(404).send('Image not found');
      return;
    }

    let imgData = post.cover_image;

    // If it's the broken infinite loop URL, regenerate the SVG on the fly
    if (imgData.includes('/api/seo/images/')) {
       imgData = generateSvgThumbnail(post.title || slug);
    }

    if (!imgData.startsWith('data:image')) {
       res.redirect(imgData);
       return;
    }

    const isSvg = imgData.includes('svg+xml');
    const contentType = isSvg ? 'image/svg+xml' : 'image/jpeg';
    
    const base64Data = imgData.replace(/^data:image\\/\\w+(\\+xml)?;base64,/, '');
    const imgBuffer = Buffer.from(base64Data, 'base64');
    
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': imgBuffer.length,
      'Cache-Control': 'public, max-age=31536000'
    });
    res.end(imgBuffer);
  } catch (error) {
    console.error('Image route error:', error);
    res.status(500).send('Internal Server Error');
  }
});`;
  
  content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  fs.writeFileSync('src/routes/seoRoutes.ts', content);
  console.log("Patched seoRoutes.ts successfully");
} else {
  console.log("Could not find the target block in seoRoutes.ts");
}
