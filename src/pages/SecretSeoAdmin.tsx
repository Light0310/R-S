import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Lock, 
  Database, 
  Search, 
  ExternalLink, 
  Clock, 
  RefreshCw, 
  ChevronRight, 
  Globe, 
  TrendingUp, 
  LogOut,
  ListFilter,
  FileText,
  Sparkles,
  Edit,
  Trash2,
  X,
  Save,
  ImagePlus,
  Eye,
  PlusCircle,
  Zap
} from 'lucide-react';

interface LinkTarget {
  id: number;
  url: string;
  title: string | null;
  snippet: string | null;
  created_at: string;
  source_query: string | null;
}

interface SearchQuery {
  id: number;
  query_string: string;
  status: string;
  created_at: string;
}

export default function SecretSeoAdmin() {
  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('redstream_admin_token') || 'redstream_secret_2026';
  });
  const [isTokenSaved, setIsTokenSaved] = useState(() => {
    return !!localStorage.getItem('redstream_admin_token');
  });

  // Action / Execution States
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [lastGeneratedSlug, setLastGeneratedSlug] = useState<string | null>(null);

  // Data Loading States
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState('');
  const [links, setLinks] = useState<LinkTarget[]>([]);
  const [queries, setQueries] = useState<SearchQuery[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [generationLoading, setGenerationLoading] = useState(false);

  // Custom AI Topic Generation Input
  const [customTopic, setCustomTopic] = useState('');

  // Add Query State
  const [newQuery, setNewQuery] = useState('');
  const [addQueryLoading, setAddQueryLoading] = useState(false);

  // Tab control
  const [activeTab, setActiveTab] = useState<'articles' | 'generator' | 'queries' | 'links'>('articles');
  const [queryFilter, setQueryFilter] = useState<string>('all');
  const [blogSearch, setBlogSearch] = useState('');

  // Edit/Delete Article States
  const [editingPost, setEditingPost] = useState<any>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [actionError, setActionError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const topicSuggestions = [
    'How to Fix IPTV Buffering & Freezing in 2026',
    'Best IPTV Players for Android TV & Firestick',
    'Complete Setup Guide for IPTV on Samsung Smart TV',
    'How to Watch Premier League & Champions League in 4K',
    'TiviMate Premium Setup and Optimization Guide',
    'IPTV vs Cable TV: Cost and Quality Comparison 2026',
    'How to Configure IPTV on Apple TV and iOS Devices'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPost) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const defaultAlt = file.name.split('.')[0].replace(/[-_]/g, ' ');
      const seoAltText = window.prompt("Enter SEO Alt Text for this image (Important for Google indexing):", defaultAlt);
      
      if (seoAltText === null) {
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      
      const imageMarkdown = `\n![${seoAltText || defaultAlt}](${base64String})\n`;

      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentContent = editingPost.content || '';
        const newContent = currentContent.substring(0, start) + imageMarkdown + currentContent.substring(end);
        setEditingPost({ ...editingPost, content: newContent });
        
        setTimeout(() => {
          textarea.focus();
          textarea.selectionStart = start + imageMarkdown.length;
          textarea.selectionEnd = start + imageMarkdown.length;
        }, 0);
      } else {
        setEditingPost({ ...editingPost, content: (editingPost.content || '') + imageMarkdown });
      }
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Fetch all SEO and blog records
  const fetchSeoData = async (tokenToUse = adminToken) => {
    setDataLoading(true);
    setDataError('');
    try {
      // 1. Fetch queries & link targets
      const resultsResponse = await fetch('/api/seo/results', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': tokenToUse,
        },
      });

      if (resultsResponse.ok) {
        const data = await resultsResponse.json();
        setLinks(data.links || []);
        setQueries(data.queries || []);
      }

      // 2. Fetch all blog posts (disk files + JSON + DB)
      const blogResponse = await fetch('/api/seo/blog-posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (blogResponse.ok) {
        const blogData = await blogResponse.json();
        setBlogPosts(blogData.posts || []);
      }
    } catch (err: any) {
      console.error('[Admin] Fetch error:', err);
      setDataError(err.message || 'Failed to fetch SEO results.');
    } finally {
      setDataLoading(false);
    }
  };

  // Automated Content Generator click handler
  const handleGenerateContent = async (overrideTopic?: string) => {
    const topicToUse = overrideTopic || customTopic;
    setGenerationLoading(true);
    setStatus('idle');
    setMessage('');
    setLastGeneratedSlug(null);

    try {
      const response = await fetch('/api/seo/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({
          topic: topicToUse?.trim() || undefined,
          query: topicToUse?.trim() || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      setStatus('success');
      setMessage(data.message || 'AI Blog article generated and published successfully!');
      if (data.post?.slug) {
        setLastGeneratedSlug(data.post.slug);
      }
      setCustomTopic('');
      setActiveTab('articles');
      fetchSeoData();
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An error occurred while generating content.');
    } finally {
      setGenerationLoading(false);
    }
  };

  // Update existing article
  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setLoading(true);
    setActionError('');
    try {
      const response = await fetch(`/api/seo/blog-posts/${editingPost.id || editingPost.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify(editingPost),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update post');
      
      setBlogPosts(prev => prev.map(p => (p.slug === editingPost.slug || p.id === editingPost.id) ? (data.post || editingPost) : p));
      setEditingPost(null);
      setStatus('success');
      setMessage(`Post "${editingPost.title}" updated successfully!`);
      fetchSeoData();
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete an article
  const handleDeletePost = async (idOrSlug: string | number) => {
    if (!window.confirm('Are you sure you want to permanently delete this blog post from disk and database?')) return;
    setDeletingPostId(String(idOrSlug));
    setActionError('');
    try {
      const response = await fetch(`/api/seo/blog-posts/${idOrSlug}`, {
        method: 'DELETE',
        headers: {
          'x-admin-token': adminToken,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete post');
      
      setBlogPosts(prev => prev.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug));
      setStatus('success');
      setMessage('Blog post deleted successfully.');
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setDeletingPostId(null);
    }
  };

  // Run SEO SerpApi search
  const handleRunSearch = async () => {
    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/seo/run-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      setStatus('success');
      setMessage(
        `Search executed successfully. Query: "${data.query || ''}". Parsed: ${data.resultsParsed || 0}, Inserted: ${data.newUrlsInserted || 0}.`
      );
      fetchSeoData();
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An error occurred while executing the search.');
    } finally {
      setLoading(false);
    }
  };

  // Add query to queue
  const handleAddQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuery.trim()) return;

    setAddQueryLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/seo/add-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({ searchQuery: newQuery }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      setStatus('success');
      setMessage('Query added to queue successfully!');
      setNewQuery('');
      fetchSeoData();
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An error occurred while adding the query.');
    } finally {
      setAddQueryLoading(false);
    }
  };

  // Auto-fetch data on load if token is available
  useEffect(() => {
    if (isTokenSaved && adminToken) {
      fetchSeoData(adminToken);
    }
  }, [isTokenSaved]);

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken.trim()) {
      setStatus('error');
      setMessage('Please enter a valid Admin Secret Token.');
      return;
    }
    localStorage.setItem('redstream_admin_token', adminToken);
    setIsTokenSaved(true);
    setStatus('success');
    setMessage('Admin token saved and authenticated.');
    fetchSeoData(adminToken);
  };

  const handleClearToken = () => {
    localStorage.removeItem('redstream_admin_token');
    setAdminToken('');
    setIsTokenSaved(false);
    setLinks([]);
    setQueries([]);
    setStatus('idle');
    setMessage('');
    setDataError('');
  };

  // Quick stats calculation
  const stats = React.useMemo(() => {
    const totalQueries = queries.length;
    const completedQueries = queries.filter(q => q.status === 'completed').length;
    const pendingQueries = queries.filter(q => q.status === 'pending').length;
    const totalLinks = links.length;
    const totalArticles = blogPosts.length;
    return { totalQueries, completedQueries, pendingQueries, totalLinks, totalArticles };
  }, [queries, links, blogPosts]);

  // Filtered queries based on status selector
  const filteredQueries = React.useMemo(() => {
    if (queryFilter === 'all') return queries;
    return queries.filter(q => q.status === queryFilter);
  }, [queries, queryFilter]);

  // Filtered blog posts
  const filteredBlogPosts = React.useMemo(() => {
    if (!blogSearch.trim()) return blogPosts;
    const s = blogSearch.toLowerCase();
    return blogPosts.filter(p => 
      (p.title || '').toLowerCase().includes(s) || 
      (p.slug || '').toLowerCase().includes(s) ||
      (p.description || '').toLowerCase().includes(s)
    );
  }, [blogPosts, blogSearch]);

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans selection:bg-[#FF1E27] selection:text-white">
      {/* Header */}
      <header className="bg-[#0a0a0a] border-b border-white/5 py-4 px-4 sm:px-8 sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 filter drop-shadow(0 0 5px rgba(255,30,39,0.5))" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(16, 16) scale(0.93)">
                <path d="M 120 140 L 340 140 A 75 75 0 0 1 415 215 A 75 75 0 0 1 340 290 L 280 290 L 400 380 L 330 380 L 225 300 L 150 380 L 105 380 L 205 300 L 245 250 L 340 250 A 35 35 0 0 0 375 215 A 35 35 0 0 0 340 180 L 160 180 Z" fill="#FF1E27" />
                <polygon points="120,200 200,245 120,290" fill="#FFFFFF" />
              </g>
            </svg>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">
                RedStream <span className="text-[#FF1E27]">SEO & AI Content Studio</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                Automated Programmatic SEO & Persistent Blog Publisher
                <span className="text-gray-700">|</span>
                <a href="/en/blog" target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                  View Live Blog <ExternalLink size={11} />
                </a>
              </p>
            </div>
          </div>

          {isTokenSaved ? (
            <div className="flex items-center gap-3">
              <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Connected
              </span>
              <button
                onClick={() => fetchSeoData()}
                disabled={dataLoading}
                className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-white/10"
              >
                <RefreshCw size={13} className={dataLoading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                onClick={handleClearToken}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                Disconnect
              </button>
            </div>
          ) : (
            <span className="text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full font-medium">
              Authentication Required
            </span>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
        
        {/* Step 1: Token Setup if not connected */}
        {!isTokenSaved ? (
          <div className="max-w-md mx-auto bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl mt-12">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FF1E27]/10 flex items-center justify-center border border-[#FF1E27]/20">
                <Lock className="w-6 h-6 text-[#FF1E27]" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold tracking-tight">Admin Authentication</h2>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Enter your secret administrator token to unlock the SEO database controller and AI generation engine.
              </p>
            </div>

            <form onSubmit={handleSaveToken} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="admin-token" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Admin Secret Token
                </label>
                <input
                  id="admin-token"
                  type="password"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  placeholder="Enter ADMIN_SECRET"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#FF1E27]/50 focus:ring-1 focus:ring-[#FF1E27]/30 outline-none text-sm transition-all placeholder-gray-600"
                />
                <p className="text-[10px] text-gray-500">
                  Default token: <code className="text-gray-400 font-mono bg-white/5 px-1 py-0.5 rounded">redstream_secret_2026</code>
                </p>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FF1E27] hover:bg-[#e0141d] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#FF1E27]/15 cursor-pointer"
              >
                Unlock Dashboard
              </button>
            </form>

            {status === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start gap-2 text-xs font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}
          </div>
        ) : (
          /* Full Dashboard view when connected */
          <div className="space-y-8">
            
            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF1E27]/10 flex items-center justify-center border border-[#FF1E27]/20 text-[#FF1E27]">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Live Articles</div>
                  <div className="text-2xl font-black text-white">{stats.totalArticles}</div>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                  <Database size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Link Targets</div>
                  <div className="text-2xl font-black text-white">{stats.totalLinks}</div>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-400">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Completed Searches</div>
                  <div className="text-2xl font-black text-white">{stats.completedQueries}</div>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-400">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pending Keywords</div>
                  <div className="text-2xl font-black text-white">{stats.pendingQueries}</div>
                </div>
              </div>
            </div>

            {/* AI Generator Hero Box */}
            <div className="bg-gradient-to-br from-[#120a0b] via-[#0f0f0f] to-[#0a1012] border border-[#FF1E27]/20 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FF1E27] animate-pulse" />
                    <h2 className="text-lg font-black tracking-tight text-white uppercase">
                      AI Content Studio & Persistent Publisher
                    </h2>
                  </div>
                  <p className="text-xs text-gray-400 font-light max-w-2xl">
                    Generate in-depth, human-like SEO guides using Gemini AI. Every generated post is automatically saved as a permanent Markdown file on disk and synchronized to the database, ensuring zero data loss.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleGenerateContent()}
                    disabled={generationLoading}
                    className="flex items-center gap-2 px-5 py-3 bg-[#FF1E27] hover:bg-[#e0141d] text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-[#FF1E27]/25 disabled:opacity-50 cursor-pointer"
                  >
                    {generationLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                    {generationLoading ? 'Writing Article...' : 'Quick Auto-Generate'}
                  </button>
                </div>
              </div>

              {/* Custom Topic Generator Form */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                  Generate Article on Any Custom Keyword / Topic:
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="e.g. Best IPTV for Samsung Smart TV, Fix Buffering on Firestick 4K, TiviMate Setup Guide..."
                      className="w-full pl-4 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#FF1E27]/60 focus:ring-1 focus:ring-[#FF1E27]/30 outline-none text-sm transition-all text-white placeholder-gray-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && customTopic.trim() && !generationLoading) {
                          handleGenerateContent(customTopic);
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleGenerateContent(customTopic)}
                    disabled={generationLoading || !customTopic.trim()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                  >
                    {generationLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {generationLoading ? 'Generating...' : 'Generate AI Article'}
                  </button>
                </div>

                {/* Instant Topic Suggestions */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-[11px] text-gray-500 font-medium">Quick Suggestions:</span>
                  {topicSuggestions.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCustomTopic(topic);
                        handleGenerateContent(topic);
                      }}
                      disabled={generationLoading}
                      className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-2.5 py-1 rounded-lg border border-white/5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      + {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Alert Notification */}
              {status !== 'idle' && (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                    status === 'success'
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      {status === 'success' ? 'Execution Success' : 'Execution Error'}
                    </h4>
                    <p className="text-sm font-medium">{message}</p>
                    {lastGeneratedSlug && (
                      <div className="pt-2">
                        <a
                          href={`/en/blog/${lastGeneratedSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs bg-green-500/20 hover:bg-green-500/30 text-green-300 font-bold px-3 py-1.5 rounded-lg transition-colors border border-green-500/30"
                        >
                          <Eye size={13} /> View Published Article Live ({`/en/blog/${lastGeneratedSlug}`})
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'articles'
                      ? 'bg-[#FF1E27] text-white shadow-lg shadow-[#FF1E27]/25'
                      : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <FileText size={14} />
                  Published Blog Articles ({blogPosts.length})
                </button>
                <button
                  onClick={() => setActiveTab('queries')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'queries'
                      ? 'bg-[#FF1E27] text-white shadow-lg shadow-[#FF1E27]/25'
                      : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Search size={14} />
                  Search Keywords Queue ({queries.length})
                </button>
                <button
                  onClick={() => setActiveTab('links')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'links'
                      ? 'bg-[#FF1E27] text-white shadow-lg shadow-[#FF1E27]/25'
                      : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Database size={14} />
                  Link Targets ({links.length})
                </button>
              </div>

              {activeTab === 'articles' && (
                <div className="w-full sm:w-64">
                  <input
                    type="text"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF1E27]"
                  />
                </div>
              )}
            </div>

            {/* TAB 1: BLOG ARTICLES LIST */}
            {activeTab === 'articles' && (
              <div className="space-y-4">
                {dataLoading && blogPosts.length === 0 ? (
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 text-[#FF1E27] animate-spin" />
                    <p className="text-xs text-gray-500 font-medium">Loading published articles...</p>
                  </div>
                ) : filteredBlogPosts.length === 0 ? (
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-12 text-center text-gray-500 space-y-3">
                    <FileText className="w-10 h-10 mx-auto text-gray-600" />
                    <h4 className="text-sm font-bold text-gray-300">No blog articles match your criteria</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      Use the AI Content Generator box above to generate and permanently publish new high-ranking articles!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredBlogPosts.map((post) => (
                      <div 
                        key={post.id || post.slug} 
                        className="bg-[#0f0f0f] border border-white/5 hover:border-white/15 rounded-2xl p-5 space-y-3 transition-all hover:bg-[#121212]"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-bold text-gray-100 leading-snug">
                                {post.title}
                              </h3>
                              <span className="text-[10px] font-extrabold uppercase bg-green-500/10 border border-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full">
                                {post.status || 'published'}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                              <a
                                href={`/en/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#FF1E27] hover:underline flex items-center gap-1"
                              >
                                /en/blog/{post.slug}
                                <ExternalLink size={12} />
                              </a>
                              {post.date && <span>• {post.date}</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <a
                              href={`/en/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                            >
                              <Eye size={13} />
                              View
                            </a>
                            <button
                              onClick={() => {
                                setEditingPost({
                                  ...post,
                                  tags: Array.isArray(post.tags) ? post.tags : (post.tags ? [post.tags] : ['iptv'])
                                });
                                setPreviewMode(false);
                              }}
                              className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg border border-white/5 transition-colors cursor-pointer"
                            >
                              <Edit size={13} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id || post.slug)}
                              disabled={deletingPostId === String(post.id || post.slug)}
                              className="flex items-center gap-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20 transition-colors cursor-pointer"
                            >
                              {deletingPostId === String(post.id || post.slug) ? (
                                <Loader2 size={13} className="animate-spin" />
                              ) : (
                                <Trash2 size={13} />
                              )}
                              Delete
                            </button>
                          </div>
                        </div>

                        {post.description && (
                          <p className="text-xs text-gray-400 font-light leading-relaxed">
                            {post.description}
                          </p>
                        )}

                        {post.tags && (Array.isArray(post.tags) ? post.tags : [post.tags]).length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
                            {(Array.isArray(post.tags) ? post.tags : [post.tags]).map((tag: string, i: number) => (
                              <span key={i} className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SEARCH QUEUE */}
            {activeTab === 'queries' && (
              <div className="space-y-6">
                <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wide">
                        Search Keywords & Extraction Queue
                      </h3>
                      <p className="text-xs text-gray-500">
                        Add target search terms to extract top ranking link targets via SerpApi and seed new blog articles.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleRunSearch}
                        disabled={loading || stats.pendingQueries === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FF1E27] hover:bg-[#e0141d] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-[#FF1E27]/20"
                      >
                        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                        {loading ? 'Running SerpApi...' : 'Run SEO Engine'}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleAddQuery} className="flex gap-2">
                    <input
                      type="text"
                      value={newQuery}
                      onChange={(e) => setNewQuery(e.target.value)}
                      placeholder="Add keyword to search queue (e.g. best iptv subscription 2026)..."
                      className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-500/50 outline-none text-xs text-white"
                    />
                    <button
                      type="submit"
                      disabled={addQueryLoading || !newQuery.trim()}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-xl text-xs font-bold transition-all border border-yellow-500/20 disabled:opacity-50 cursor-pointer"
                    >
                      {addQueryLoading ? <Loader2 size={13} className="animate-spin" /> : <PlusCircle size={13} />}
                      Add
                    </button>
                  </form>
                </div>

                <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                  {filteredQueries.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                      <Search className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                      <p className="text-xs">No queries in queue.</p>
                    </div>
                  ) : (
                    filteredQueries.map((q) => (
                      <div key={q.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.01]">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-gray-200">{q.query_string}</div>
                          <div className="text-[10px] text-gray-500">Created: {new Date(q.created_at).toLocaleDateString()}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                            q.status === 'completed' 
                              ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                              : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                          }`}>
                            {q.status}
                          </span>
                          <button
                            onClick={() => handleGenerateContent(q.query_string)}
                            disabled={generationLoading}
                            className="flex items-center gap-1 text-[11px] bg-[#FF1E27]/10 hover:bg-[#FF1E27]/20 text-[#FF1E27] px-2.5 py-1 rounded-lg border border-[#FF1E27]/20 transition-colors cursor-pointer"
                          >
                            <Sparkles size={11} />
                            Generate Post
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: LINK TARGETS */}
            {activeTab === 'links' && (
              <div className="space-y-4">
                {links.length === 0 ? (
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-12 text-center text-gray-500">
                    <Database className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="text-sm font-semibold">No extracted links found</h4>
                    <p className="text-xs text-gray-600 mt-1">Run the SEO Engine from the queue to extract competitor snippets.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {links.map((link) => (
                      <div 
                        key={link.id} 
                        className="bg-[#0f0f0f] border border-white/5 hover:border-white/10 rounded-2xl p-5 space-y-3 transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-gray-100 hover:text-[#FF1E27] transition-colors leading-snug">
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                                {link.title || 'Untitled Result'}
                                <ExternalLink size={14} className="flex-shrink-0 text-gray-500" />
                              </a>
                            </h4>
                            <p className="text-[11px] font-mono text-gray-500 break-all">
                              {link.url}
                            </p>
                          </div>

                          {link.source_query && (
                            <span className="text-[10px] font-extrabold uppercase bg-white/5 border border-white/10 text-gray-400 px-2.5 py-1 rounded-full whitespace-nowrap">
                              {link.source_query}
                            </span>
                          )}
                        </div>

                        {link.snippet && (
                          <p className="text-xs text-gray-400 font-light leading-relaxed">
                            {link.snippet}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </main>

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#FF1E27]" />
                <h3 className="text-lg font-bold text-white">
                  Edit Blog Article
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    previewMode ? 'bg-[#FF1E27] text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Eye size={13} />
                  {previewMode ? 'Back to Editor' : 'Live Preview'}
                </button>
                <button 
                  onClick={() => setEditingPost(null)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {actionError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {actionError}
              </div>
            )}

            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Title</label>
                  <input
                    type="text"
                    required
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27] transition-colors font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Slug (URL)</label>
                  <input
                    type="text"
                    required
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27] transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Meta Description</label>
                <textarea
                  rows={2}
                  value={editingPost.description || ''}
                  onChange={(e) => setEditingPost({...editingPost, description: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27] transition-colors resize-y"
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Tags (comma separated)</label>
                <input
                  type="text"
                  value={(Array.isArray(editingPost.tags) ? editingPost.tags : [editingPost.tags || 'iptv']).join(', ')}
                  onChange={(e) => setEditingPost({
                    ...editingPost, 
                    tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean)
                  })}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27] transition-colors font-mono"
                />
              </div>

              {previewMode ? (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Markdown Preview</label>
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 text-sm text-gray-300 font-sans max-h-96 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {editingPost.content}
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Content (Markdown)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleImageUpload} 
                      />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded text-gray-300 transition-colors cursor-pointer"
                      >
                        <ImagePlus size={12} /> Upload Image
                      </button>
                    </div>
                  </div>
                  <textarea
                    ref={textareaRef}
                    required
                    rows={12}
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[#FF1E27] transition-colors font-mono resize-y"
                  ></textarea>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#FF1E27] hover:bg-[#E01A22] transition-colors flex items-center gap-2 shadow-lg shadow-[#FF1E27]/20 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save & Publish Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
