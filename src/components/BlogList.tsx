/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, Language, TranslationDictionary } from '../types';
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
  lang: Language;
  t: TranslationDictionary;
  onNavigate: (view: 'home' | 'blog' | 'post', slug?: string) => void;
}

export default function BlogList({ posts, lang, t, onNavigate }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags for the current posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Brand Logo Banner */}
        <div className="w-full flex justify-center mb-10">
          <div className="w-full max-w-xl aspect-[16/10] sm:aspect-[16/9] bg-[#141414] rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-[#FF1E27]/5">
            <img 
              src="/redstream_blog_cover.svg" 
              alt="RedStream™ Blog Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Header Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            {t.blogTitle}
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light">
            {t.blogSubtitle}
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27] transition-all"
            />
          </div>

          {/* Tags Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                selectedTag === null
                  ? 'bg-[#FF1E27] text-white shadow-lg shadow-[#FF1E27]/25'
                  : 'bg-[#141414] text-gray-400 border border-white/5 hover:border-white/10'
              }`}
            >
              {t.allTags}
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#FF1E27] text-white shadow-lg shadow-[#FF1E27]/25'
                    : 'bg-[#141414] text-gray-400 border border-white/5 hover:border-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-[#141414] rounded-2xl border border-white/5">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg font-medium">{t.noPosts}</p>
          </div>
        )}

        {/* Forum Style Posts List */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            {/* Forum Header Row */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-t-xl hidden md:grid grid-cols-12 gap-4 p-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest shadow-md">
              <div className="col-span-7 pl-2">Discussions</div>
              <div className="col-span-2 text-center">Stats</div>
              <div className="col-span-3 text-right pr-2">Latest Message</div>
            </div>

            {/* Forum Threads Container */}
            <div className="bg-[#141414] border-x border-b border-white/10 rounded-b-xl overflow-hidden shadow-2xl">
              {filteredPosts.map(post => {
                // Find Cover Image or fallback to standard coverImagePath
                const coverImage = post.cover_image ? post.cover_image
                  : post.slug.includes('samsung') 
                  ? '/samsung_iptv_guide.svg' 
                  : post.slug.includes('setup')
                  ? '/ultimate_iptv_setup_guide.svg'
                  : post.slug.includes('future')
                  ? '/future_streaming_trends_2026.svg'
                  : '/redstream_blog_cover.svg';

                // Mock stats based on reading time to make it look active
                const views = post.readingTime * 1427;
                const replies = post.readingTime * 34;

                return (
                  <Link 
                    to={`/${lang}/blog/${post.slug}`}
                    key={post.slug}
                    className="group flex flex-col md:grid md:grid-cols-12 gap-4 p-4 md:p-5 items-center border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Thread Info (Title, Author, Icon) */}
                    <div className="col-span-7 flex items-center gap-4 w-full">
                      <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-black items-center justify-center border border-white/10 overflow-hidden shadow-inner group-hover:border-[#FF1E27]/50 transition-colors">
                        <img 
                          src="/admin_profile.png" 
                          alt="Thumbnail" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        {post.tags && post.tags.length > 0 && (
                          <span className="inline-block bg-[#FF1E27]/10 text-[#FF1E27] text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1">
                            {post.tags[0]}
                          </span>
                        )}
                        <h2 className="text-white font-bold text-base md:text-lg leading-snug group-hover:text-[#FF1E27] transition-colors truncate">
                          {post.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                          <span className="text-[#FF1E27] font-medium">{post.author}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:flex items-center gap-1"><Clock size={12}/> {post.readingTime} {t.minutesRead}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="col-span-2 hidden md:block text-center text-xs text-gray-400 font-mono">
                      <div><span className="text-gray-300 font-medium">{replies.toLocaleString()}</span> Replies</div>
                      <div className="opacity-70">{views.toLocaleString()} Views</div>
                    </div>

                    {/* Last Post Info */}
                    <div className="col-span-3 flex md:flex-col items-center md:items-end justify-between md:justify-center text-xs text-gray-400 w-full md:pr-2">
                      <div className="flex items-center gap-2 md:hidden">
                         <span className="text-white">{replies} replies</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium mb-0.5">{post.date}</div>
                        <div className="text-[#FF1E27] hover:underline cursor-pointer">{post.author}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA Promotional Widget */}
        <div className="mt-20 bg-gradient-to-r from-[#141414] to-[#1e1414] border border-[#FF1E27]/20 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1E27]/5 rounded-full blur-3xl -z-10" />
          <span className="text-3xl sm:text-4xl mb-4 block">🎁</span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase tracking-tight">
            Ready to Try RedStream™ IPTV?
          </h3>
          <p className="text-gray-400 text-base max-w-xl mx-auto mb-8 font-light">
            Don't take our word for it. Request a <strong>Free 24h Premium Trial</strong> right now and experience zero lag, crystal-clear 4K, and 20,000+ live premium global channels.
          </p>
          <a
            href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20read%20your%20blog%20post%20and%20would%20like%20to%20get%20a%20free%20trial."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF1E27] hover:bg-[#e0141d] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#FF1E27]/25 hover:shadow-xl hover:shadow-[#FF1E27]/40 uppercase tracking-wide cursor-pointer text-sm"
          >
            Claim Free Trial on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
