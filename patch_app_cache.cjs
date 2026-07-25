const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('let globalDynamicPostsCache')) {
  code = code.replace(
    'function BlogListRoute() {',
    `let globalDynamicPostsCache: any[] | null = null;
let globalDynamicPostsPromise: Promise<any> | null = null;

export const prefetchDynamicPosts = () => {
  if (globalDynamicPostsPromise) return globalDynamicPostsPromise;
  
  const baseUrl = "https://r-s-3lw3.onrender.com";
  const endpoint = baseUrl 
    ? \`\${baseUrl.replace(/\\/$/, '')}/api/seo/blog-posts\` 
    : '/api/seo/blog-posts';

  globalDynamicPostsPromise = fetch(endpoint)
    .then(r => r.json())
    .then(data => {
      globalDynamicPostsCache = data.posts || [];
      return globalDynamicPostsCache;
    })
    .catch(err => {
      console.error('[Prefetch] Error loading dynamic posts:', err);
      globalDynamicPostsPromise = null;
      return [];
    });
    
  return globalDynamicPostsPromise;
};

function BlogListRoute() {`
  );
}

// Modify BlogListRoute
const oldBlogListEffect = `  useEffect(() => {
    const fetchDynamicPosts = async () => {
      try {
        const baseUrl = "https://r-s-3lw3.onrender.com";
        const endpoint = baseUrl 
          ? \`\${baseUrl.replace(/\\/$/, '')}/api/seo/blog-posts\` 
          : '/api/seo/blog-posts';

        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setDynamicPosts(data.posts || []);
        }
      } catch (err) {
        console.error('[BlogList] Error loading dynamic posts:', err);
      }
    };

    fetchDynamicPosts();
  }, []);`;

const newBlogListEffect = `  useEffect(() => {
    if (globalDynamicPostsCache) {
      setDynamicPosts(globalDynamicPostsCache);
    }
    prefetchDynamicPosts().then(posts => {
      setDynamicPosts(posts);
    });
  }, []);`;

code = code.replace(oldBlogListEffect, newBlogListEffect);

// Modify BlogPostRoute
const oldBlogPostEffect = `  useEffect(() => {
    const fetchSingleDynamicPost = async () => {
      // First check if it's a static post, if so, no need to fetch
      if (loadBlogPosts().find((p) => p.slug === slug && p.lang === currentLang)) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const baseUrl = "https://r-s-3lw3.onrender.com";
        const endpoint = baseUrl 
          ? \`\${baseUrl.replace(/\\/$/, '')}/api/seo/blog-posts/\${slug}\` 
          : \`/api/seo/blog-posts/\${slug}\`;

        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.post) {
            setDynamicPost({
              slug: data.post.slug,
              lang: 'en' as Language,
              title: data.post.title,
              date: new Date(data.post.created_at).toISOString().split('T')[0],
              author: 'RedStream Admin',
              tags: data.post.tags || [],
              description: data.post.description || '',
              content: data.post.content,
              readingTime: Math.max(1, Math.ceil((data.post.content || '').split(/\\s+/).length / 200)),
            });
          }
        }
      } catch (err) {
        console.error('[BlogPost] Error fetching dynamic post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleDynamicPost();
  }, [slug, currentLang]);`;

const newBlogPostEffect = `  useEffect(() => {
    const fetchSingleDynamicPost = async () => {
      // First check if it's a static post, if so, no need to fetch
      if (loadBlogPosts().find((p) => p.slug === slug && p.lang === currentLang)) {
        setLoading(false);
        return;
      }

      // Check cache first
      if (globalDynamicPostsCache) {
        const cached = globalDynamicPostsCache.find(p => p.slug === slug);
        if (cached) {
          setDynamicPost({
            slug: cached.slug,
            lang: 'en' as Language,
            title: cached.title,
            date: new Date(cached.created_at).toISOString().split('T')[0],
            author: 'RedStream Admin',
            tags: cached.tags || [],
            description: cached.description || '',
            content: cached.content,
            readingTime: Math.max(1, Math.ceil((cached.content || '').split(/\\s+/).length / 200)),
          });
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      try {
        const baseUrl = "https://r-s-3lw3.onrender.com";
        const endpoint = baseUrl 
          ? \`\${baseUrl.replace(/\\/$/, '')}/api/seo/blog-posts/\${slug}\` 
          : \`/api/seo/blog-posts/\${slug}\`;

        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.post) {
            setDynamicPost({
              slug: data.post.slug,
              lang: 'en' as Language,
              title: data.post.title,
              date: new Date(data.post.created_at).toISOString().split('T')[0],
              author: 'RedStream Admin',
              tags: data.post.tags || [],
              description: data.post.description || '',
              content: data.post.content,
              readingTime: Math.max(1, Math.ceil((data.post.content || '').split(/\\s+/).length / 200)),
            });
          }
        }
      } catch (err) {
        console.error('[BlogPost] Error fetching dynamic post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleDynamicPost();
  }, [slug, currentLang]);`;

code = code.replace(oldBlogPostEffect, newBlogPostEffect);

// Pre-fetch in MainApp
if (!code.includes('prefetchDynamicPosts();')) {
  code = code.replace(
    'function MainApp() {',
    `function MainApp() {
  useEffect(() => {
    prefetchDynamicPosts();
  }, []);`
  );
}

fs.writeFileSync('src/App.tsx', code);
console.log('App patched');
