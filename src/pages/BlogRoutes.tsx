/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Language } from '../types';
import { loadBlogPosts } from '../blog';
import { translations } from '../translations';
import BlogList from '../components/BlogList';
import BlogPostComponent from '../components/BlogPost';

const validLanguages: Language[] = ['en', 'ar', 'es', 'nl', 'fr', 'ru', 'de'];

let globalDynamicPostsCache: any[] | null = null;
let globalDynamicPostsPromise: Promise<any> | null = null;

export const prefetchDynamicPosts = (forceRefresh = false) => {
  if (globalDynamicPostsPromise && !forceRefresh) return globalDynamicPostsPromise;
  
  const endpoint = '/api/seo/blog-posts';

  globalDynamicPostsPromise = fetch(endpoint, { credentials: 'include' })
    .then(r => {
      if (!r.ok) throw new Error('Network response was not ok');
      return r.json();
    })
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

export function BlogListRoute() {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (validLanguages.includes(lang as Language) ? lang : 'en') as Language;
  const t = useMemo(() => translations[currentLang], [currentLang]);
  const navigate = useNavigate();
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);

  useEffect(() => {
    if (globalDynamicPostsCache) {
      setDynamicPosts(globalDynamicPostsCache);
    }
    prefetchDynamicPosts(true).then(posts => {
      setDynamicPosts(posts);
    });
  }, []);

  const combinedPosts = useMemo(() => {
    const rawStaticPosts = loadBlogPosts().filter((post) => post.lang === currentLang);

    const convertedDynamic = dynamicPosts
      .map((dp: any) => ({
        slug: dp.slug,
        lang: (dp.lang || 'en') as Language,
        title: dp.title,
        date: dp.date || (dp.created_at ? new Date(dp.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
        author: dp.author || 'RedStream Expert',
        tags: dp.tags || [],
        description: dp.description || '',
        content: dp.content,
        cover_image: dp.cover_image,
        readingTime: Math.max(1, Math.ceil((dp.content || '').split(/\s+/).length / 200)),
      }));

    const dynamicForLang = convertedDynamic.filter(p => p.lang === currentLang || (currentLang === 'en' && !p.lang));
    const dynamicSlugs = new Set(convertedDynamic.map(p => p.slug));
    const finalStaticPosts = rawStaticPosts.filter(p => !dynamicSlugs.has(p.slug));

    return currentLang === 'en' 
      ? [...finalStaticPosts, ...convertedDynamic]
      : (dynamicForLang.length > 0 ? [...finalStaticPosts, ...dynamicForLang] : finalStaticPosts);
  }, [currentLang, dynamicPosts]);

  const onNavigate = (view: string, slug?: string) => {
    if (view === 'post' && slug) {
      navigate(`/${currentLang}/blog/${slug}`);
    } else {
      navigate(`/${currentLang}/${view}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <BlogList posts={combinedPosts} lang={currentLang} t={t} onNavigate={onNavigate} />;
}

export function BlogPostRoute() {
  const { lang, slug } = useParams<{ lang: string, slug: string }>();
  const currentLang = (validLanguages.includes(lang as Language) ? lang : 'en') as Language;
  const t = useMemo(() => translations[currentLang], [currentLang]);
  const navigate = useNavigate();
  const [dynamicPost, setDynamicPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleDynamicPost = async () => {
      setLoading(true);
      try {
        const endpoint = `/api/seo/blog-posts/${slug}`;
        const response = await fetch(endpoint, { credentials: 'include' });
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
              cover_image: data.post.cover_image,
              readingTime: Math.max(1, Math.ceil((data.post.content || '').split(/\s+/).length / 200)),
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
  }, [slug, currentLang]);

  const activePost = useMemo(() => {
    const staticPost = loadBlogPosts().find((p) => p.slug === slug && p.lang === currentLang);
    return dynamicPost || staticPost;
  }, [slug, currentLang, dynamicPost]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 text-[#FF1E27] animate-spin" />
      </div>
    );
  }

  if (!activePost) {
    return <Navigate to={`/${currentLang}/blog`} replace />;
  }

  return <BlogPostComponent post={activePost} lang={currentLang} t={t} onBack={() => navigate(`/${currentLang}/blog`)} />;
}
