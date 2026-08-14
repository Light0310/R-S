import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadBlogPosts } from '../blog';
import { Language } from '../types';

const validLanguages: Language[] = ['en', 'ar', 'es', 'nl', 'fr', 'ru', 'de'];

export default function HtmlSitemap() {
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchDynamicPosts = async () => {
      try {
        const endpoint = '/api/seo/blog-posts';
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setDynamicPosts(data.posts || []);
        }
      } catch (err) {
        console.error('[HtmlSitemap] Error loading dynamic posts:', err);
      }
    };
    fetchDynamicPosts();
  }, []);

  const staticPosts = loadBlogPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-white">HTML Sitemap</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Main Pages */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#FF1E27] border-b border-white/10 pb-2">Main Pages</h2>
            <ul className="space-y-2 text-gray-300">
              {validLanguages.map((lang) => (
                <li key={lang}>
                  <Link to={lang === 'en' ? '/' : `/${lang}`} className="hover:text-white transition-colors">
                    Home ({lang.toUpperCase()})
                  </Link>
                </li>
              ))}
              {validLanguages.map((lang) => (
                <li key={`blog-${lang}`}>
                  <Link to={`/${lang}/blog`} className="hover:text-white transition-colors">
                    Blog Index ({lang.toUpperCase()})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#FF1E27] border-b border-white/10 pb-2">Blog Posts</h2>
            <ul className="space-y-2 text-gray-300">
              {staticPosts.map((post) => (
                <li key={`${post.lang}-${post.slug}`}>
                  <Link to={`/${post.lang}/blog/${post.slug}`} className="hover:text-white transition-colors">
                    {post.title}
                  </Link>
                </li>
              ))}
              {dynamicPosts.map((post) => (
                <li key={`dyn-${post.slug}`}>
                  <Link to={`/en/blog/${post.slug}`} className="hover:text-white transition-colors">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
