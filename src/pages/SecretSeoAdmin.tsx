import React, { useState, useEffect } from 'react';
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
  ListFilter
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
    return localStorage.getItem('redstream_admin_token') || '';
  });
  const [isTokenSaved, setIsTokenSaved] = useState(() => {
    return !!localStorage.getItem('redstream_admin_token');
  });

  // Action / Execution States
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Data Loading States
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState('');
  const [links, setLinks] = useState<LinkTarget[]>([]);
  const [queries, setQueries] = useState<SearchQuery[]>([]);

  // Tab control
  const [activeTab, setActiveTab] = useState<'links' | 'queries'>('links');
  const [queryFilter, setQueryFilter] = useState<string>('all');

  // Fetch data function
  const fetchSeoData = async (tokenToUse = adminToken) => {
    if (!tokenToUse) return;
    
    setDataLoading(true);
    setDataError('');
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const endpoint = baseUrl 
        ? `${baseUrl.replace(/\/$/, '')}/api/seo/results` 
        : '/api/seo/results';

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': tokenToUse,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      setLinks(data.links || []);
      setQueries(data.queries || []);
    } catch (err: any) {
      console.error('[Admin] Fetch error:', err);
      setDataError(err.message || 'Failed to fetch SEO results. Please verify your token.');
    } finally {
      setDataLoading(false);
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

  const handleRunSearch = async () => {
    if (!adminToken) {
      setStatus('error');
      setMessage('Please enter the Admin Secret Token.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const endpoint = baseUrl 
        ? `${baseUrl.replace(/\/$/, '')}/api/seo/run-search` 
        : '/api/seo/run-search';

      const response = await fetch(endpoint, {
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
      // Refresh database records automatically after successful run
      fetchSeoData();
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An unexpected error occurred while executing the search.');
    } finally {
      setLoading(false);
    }
  };

  // Quick stats calculation
  const stats = React.useMemo(() => {
    const totalQueries = queries.length;
    const completedQueries = queries.filter(q => q.status === 'completed').length;
    const pendingQueries = queries.filter(q => q.status === 'pending').length;
    const totalLinks = links.length;
    return { totalQueries, completedQueries, pendingQueries, totalLinks };
  }, [queries, links]);

  // Filtered queries based on status selector
  const filteredQueries = React.useMemo(() => {
    if (queryFilter === 'all') return queries;
    return queries.filter(q => q.status === queryFilter);
  }, [queries, queryFilter]);

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans selection:bg-[#FF1E27] selection:text-white">
      {/* Header */}
      <header className="bg-[#0a0a0a] border-b border-white/5 py-4 px-4 sm:px-8">
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
                RedStream <span className="text-[#FF1E27]">SEO Control Panel</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">Internal Programmatic SEO Administrator</p>
            </div>
          </div>

          {isTokenSaved && (
            <div className="flex items-center gap-3">
              <span className="text-xs bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Authenticated
              </span>
              <button
                onClick={handleClearToken}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                Disconnect
              </button>
            </div>
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
                Please enter your secret administrator token to unlock the SEO database controller and engine logs.
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
          /* Step 2: Full Dashboard view when connected */
          <div className="space-y-8">
            
            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF1E27]/10 flex items-center justify-center border border-[#FF1E27]/20 text-[#FF1E27]">
                  <Database size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Link Targets</div>
                  <div className="text-2xl font-black">{stats.totalLinks}</div>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                  <Search size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Queries</div>
                  <div className="text-2xl font-black">{stats.totalQueries}</div>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-400">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Completed</div>
                  <div className="text-2xl font-black">{stats.completedQueries}</div>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-400">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pending Queue</div>
                  <div className="text-2xl font-black">{stats.pendingQueries}</div>
                </div>
              </div>
            </div>

            {/* Run SEO Engine Action Bar */}
            <div className="bg-gradient-to-r from-[#0f0f0f] to-[#120a0b] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-ping" />
                  <h3 className="text-base font-bold tracking-tight">Active Automation Engine</h3>
                </div>
                <p className="text-xs text-gray-400 font-light">
                  Triggering the engine reads the next <span className="text-yellow-400 font-medium">pending</span> search query from the PostgreSQL table, initiates an organic Google Search query via SerpApi, and parses the top results to programmatically register high-authority link targets.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => fetchSeoData()}
                  disabled={dataLoading}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-white/10 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw size={14} className={dataLoading ? 'animate-spin' : ''} />
                  Refresh Data
                </button>
                <button
                  onClick={handleRunSearch}
                  disabled={loading || stats.pendingQueries === 0}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF1E27] hover:bg-[#e0141d] text-white rounded-xl text-xs font-black transition-all shadow-md shadow-[#FF1E27]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  {loading ? 'Processing SerpApi...' : 'Run SEO Engine'}
                </button>
              </div>
            </div>

            {/* Response Alerts */}
            {status !== 'idle' && (
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  status === 'success'
                    ? 'bg-green-500/5 border-green-500/20 text-green-400'
                    : 'bg-red-500/5 border-red-500/20 text-red-400'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-1">
                    {status === 'success' ? 'Engine Execution Success' : 'Engine Execution Error'}
                  </h4>
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </div>
            )}

            {/* Main Tabs and Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Left Column: List/Table of link targets */}
              <div className="xl:col-span-2 space-y-4">
                
                {/* Tabs switcher */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('links')}
                      className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                        activeTab === 'links'
                          ? 'bg-[#FF1E27]/10 text-[#FF1E27] border border-[#FF1E27]/20'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Extracted Link Targets ({links.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('queries')}
                      className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                        activeTab === 'queries'
                          ? 'bg-[#FF1E27]/10 text-[#FF1E27] border border-[#FF1E27]/20'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Engine Search Queue ({queries.length})
                    </button>
                  </div>
                  
                  {activeTab === 'queries' && (
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-[10px] font-bold text-gray-400">
                      <ListFilter size={11} />
                      <select 
                        value={queryFilter}
                        onChange={(e) => setQueryFilter(e.target.value)}
                        className="bg-transparent text-gray-300 outline-none border-none cursor-pointer"
                      >
                        <option value="all" className="bg-[#0f0f0f]">All Queries</option>
                        <option value="pending" className="bg-[#0f0f0f]">Pending Only</option>
                        <option value="completed" className="bg-[#0f0f0f]">Completed Only</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Table Data States */}
                {dataLoading && links.length === 0 ? (
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 text-[#FF1E27] animate-spin" />
                    <p className="text-xs text-gray-500 font-medium">Fetching real-time database records...</p>
                  </div>
                ) : dataError ? (
                  <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8 text-center text-red-400 flex flex-col items-center gap-2">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                    <h4 className="text-sm font-bold">Failed to Load Database Records</h4>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">{dataError}</p>
                  </div>
                ) : activeTab === 'links' ? (
                  /* LINKS LIST */
                  <div className="space-y-4">
                    {links.length === 0 ? (
                      <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-12 text-center text-gray-500">
                        <Database className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                        <h4 className="text-sm font-semibold">No extracted links found</h4>
                        <p className="text-xs text-gray-600 mt-1">Run the SEO Engine above to populate link targets from SerpApi.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {links.map((link) => (
                          <div 
                            key={link.id} 
                            className="bg-[#0f0f0f] border border-white/5 hover:border-white/10 rounded-2xl p-5 space-y-3 transition-all hover:bg-[#121212]"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <h4 className="text-sm sm:text-base font-bold text-gray-100 hover:text-[#FF1E27] transition-colors leading-snug">
                                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                                    {link.title || 'Untitled Result'}
                                    <ExternalLink size={14} className="flex-shrink-0 text-gray-500" />
                                  </a>
                                </h4>
                                <p className="text-[11px] font-mono text-gray-500 break-all select-all">
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

                            <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold border-t border-white/5 pt-3">
                              <span className="flex items-center gap-1">
                                <Clock size={11} />
                                {new Date(link.created_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* QUERIES LIST */
                  <div className="space-y-3">
                    {filteredQueries.length === 0 ? (
                      <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-12 text-center text-gray-500">
                        <Search className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                        <h4 className="text-sm font-semibold">No queries matches this filter</h4>
                        <p className="text-xs text-gray-600 mt-1">Please insert queries into database or change your active filters.</p>
                      </div>
                    ) : (
                      <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                        {filteredQueries.map((q) => (
                          <div key={q.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors">
                            <div className="space-y-1">
                              <div className="text-xs font-extrabold text-gray-200">
                                {q.query_string}
                              </div>
                              <div className="text-[10px] text-gray-500 font-medium">
                                Created at: {new Date(q.created_at).toLocaleDateString()}
                              </div>
                            </div>

                            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                              q.status === 'completed' 
                                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                                : q.status === 'pending'
                                ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                : 'bg-gray-500/10 border-gray-500/20 text-gray-400'
                            }`}>
                              {q.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Right Column: SEO Instructions & Quick Guide */}
              <div className="space-y-6">
                
                <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-[#FF1E27]">
                    <TrendingUp size={18} />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider">SEO Mastermind Strategy</h3>
                  </div>
                  
                  <div className="space-y-4 text-xs leading-relaxed text-gray-400">
                    <p>
                      Programmatic SEO automatically seeds landing pages with rich search results to rank highly on search engine index pages.
                    </p>
                    <div className="space-y-2 border-l border-white/10 pl-3">
                      <div className="font-bold text-gray-300">How to rank faster:</div>
                      <ul className="list-disc list-inside space-y-1 font-light">
                        <li>Maintain low latency endpoints</li>
                        <li>Keep search tags structured</li>
                        <li>Automate SerpApi extraction</li>
                        <li>Incorporate schema markups</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Globe size={18} />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider">SerpApi Configuration</h3>
                  </div>
                  <div className="space-y-3 text-xs text-gray-400 leading-relaxed font-light">
                    <p>
                      SerpApi translates live Google search queries into clean, highly-parsable structured JSON payloads securely proxying our server-side API keys.
                    </p>
                    <p className="font-medium text-gray-300">
                      Required Variables:
                    </p>
                    <div className="font-mono bg-white/5 border border-white/10 p-2.5 rounded-lg text-[10px] text-gray-300 space-y-1">
                      <div>DATABASE_URL=...</div>
                      <div>SERPAPI_KEY=...</div>
                      <div>ADMIN_SECRET=...</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
