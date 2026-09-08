import { getBlogPostBySlug } from './src/services/blogStorage';

async function test() {
  const post = await getBlogPostBySlug('test-image-with-pollinations-ai');
  console.log("Post found:", !!post);
  if (post) {
    console.log("Cover image exists:", !!post.cover_image);
  }
}
test();
