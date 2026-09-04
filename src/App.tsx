/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams, Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';
import { Language } from './types';
import { loadBlogPosts } from './blog';
import { translations } from './translations';

// Components
import Home from './components/Home';
import BlogList from './components/BlogList';
import BlogPostComponent from './components/BlogPost';
import SecretSeoAdmin from './pages/SecretSeoAdmin';
import HtmlSitemap from './pages/HtmlSitemap';

const languageNames: Record<Language, { native: string; flag: string; label: string }> = {
  en: { native: 'English', flag: '🇬🇧', label: 'EN' },
  ar: { native: 'العربية', flag: '🇲🇦', label: 'AR' },
  es: { native: 'Español', flag: '🇪🇸', label: 'ES' },
  nl: { native: 'Nederlands', flag: '🇳🇱', label: 'NL' },
  fr: { native: 'Français', flag: '🇫🇷', label: 'FR' },
  ru: { native: 'Русский', flag: '🇷🇺', label: 'RU' },
  de: { native: 'Deutsch', flag: '🇩🇪', label: 'DE' }
};

const validLanguages: Language[] = ['en', 'ar', 'es', 'nl', 'fr', 'ru', 'de'];

function CatchAllRedirect() {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang || "en"}/home`} replace />;
}

function MainLayout() {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (validLanguages.includes(lang as Language) ? lang : 'en') as Language;
  const t = useMemo(() => translations[currentLang], [currentLang]);
  const navigate = useNavigate();
  const location = useLocation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleNavigate = (view: string) => {
    navigate(`/${currentLang}/${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeLanguage = (newLang: Language) => {
    setLangDropdownOpen(false);
    // Replace current language in the path with new language
    const currentPath = location.pathname;
    const newPath = currentPath.replace(new RegExp(`^/${currentLang}`), `/${newLang}`);
    navigate(newPath);
  };
  
  // Mobile bottom nav logic based on location
  const isBlogActive = location.pathname.includes('/blog');

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to={currentLang === 'en' ? '/' : `/${currentLang}`} className="flex items-center gap-2 cursor-pointer select-none">
            <svg className="w-7 h-7 filter drop-shadow(0 0 5px rgba(255,30,39,0.5))" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(16, 16) scale(0.93)">
                <path d="M 120 140 L 340 140 A 75 75 0 0 1 415 215 A 75 75 0 0 1 340 290 L 280 290 L 400 380 L 330 380 L 225 300 L 150 380 L 105 380 L 205 300 L 245 250 L 340 250 A 35 35 0 0 0 375 215 A 35 35 0 0 0 340 180 L 160 180 Z" fill="#FF1E27" />
                <polygon points="120,200 200,245 120,290" fill="#FFFFFF" />
              </g>
            </svg>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Red<span className="text-[#FF1E27]">Stream</span>
            </span>
          </Link>
          {/* Navigation Center Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to={currentLang === 'en' ? '/' : `/${currentLang}`}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:text-[#FF1E27] text-gray-300 cursor-pointer"
            >
              {t.navHome}
            </Link>
            <Link
              to={`/${currentLang}/blog`}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all text-[#FF1E27] bg-[#FF1E27]/10 cursor-pointer"
            >
              {t.navBlog}
            </Link>
            <Link
              to="/sitemap"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:text-[#FF1E27] text-gray-300 cursor-pointer"
            >
              Sitemap
            </Link>
          </nav>

          {/* Language Selector Dropdown & CTA Button */}
          <div className="flex items-center gap-4">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-[#141414] hover:border-white/20 active:bg-white/5 text-xs font-bold transition-all text-white cursor-pointer select-none"
              >
                <Globe size={14} className="text-gray-400" />
                <span>{languageNames[currentLang].flag} {languageNames[currentLang].label}</span>
                <ChevronDown size={12} className={`text-gray-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <>
                    <div 
                       className="fixed inset-0 z-30" 
                       onClick={() => setLangDropdownOpen(false)} 
                     />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-40 rounded-xl border border-white/10 bg-[#141414] p-1 shadow-2xl z-40 overflow-hidden"
                    >
                      {Object.entries(languageNames).map(([key, value]) => (
                        <Link
                          key={key}
                          to={location.pathname === '/' && key !== 'en' ? `/${key}/home` : location.pathname.replace(new RegExp(`^/(${validLanguages.join('|')})`), `/${key}`)}
                          onClick={() => setLangDropdownOpen(false)}
                          className={`w-full text-start flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                            currentLang === key
                              ? 'bg-[#FF1E27]/10 text-[#FF1E27] font-bold'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{value.flag}</span>
                            <span>{value.native}</span>
                          </span>
                          {currentLang === key && <CheckCircle2 size={13} className="text-[#FF1E27]" />}
                        </Link>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Trial CTA Link */}
            <a
              href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20want%20to%20get%20a%20free%20trial."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF1E27] hover:bg-[#e0141d] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all shadow-lg shadow-[#FF1E27]/15"
            >
              Get Free Trial
            </a>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Helper Bar */}
      <div className="md:hidden sticky top-16 z-30 bg-[#0c0c0c]/90 border-b border-white/5 flex justify-center py-2.5 px-4 gap-4 text-xs font-bold text-gray-400">
        <Link 
           to={`/${currentLang}`}
          className="hover:text-white cursor-pointer"
        >
          {t.navHome}
        </Link>
        <span>•</span>
        <Link 
           to={`/${currentLang}/blog`}
          className={`hover:text-white cursor-pointer ${isBlogActive ? 'text-[#FF1E27]' : ''}`}
        >
          {t.navBlog}
        </Link>
      </div>

      {/* Main Container Content */}
      <main className="flex-grow">
        <div className="w-full">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] border-t border-white/5 py-8 text-center text-xs text-gray-500 font-medium mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 filter drop-shadow(0 0 3px rgba(255,30,39,0.5))" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(16, 16) scale(0.93)">
                <path d="M 120 140 L 340 140 A 75 75 0 0 1 415 215 A 75 75 0 0 1 340 290 L 280 290 L 400 380 L 330 380 L 225 300 L 150 380 L 105 380 L 205 300 L 245 250 L 340 250 A 35 35 0 0 0 375 215 A 35 35 0 0 0 340 180 L 160 180 Z" fill="#FF1E27" />
                <polygon points="120,200 200,245 120,290" fill="#FFFFFF" />
              </g>
            </svg>
            <span className="font-extrabold text-white">RedStream IPTV</span>
          </div>
          
          <div className="flex items-center gap-4 text-gray-400 font-medium">
            <Link to={currentLang === 'en' ? '/' : `/${currentLang}`} className="hover:text-white transition-colors">
              {t.navHome}
            </Link>
            <Link to={`/${currentLang}/blog`} className="hover:text-white transition-colors">
              {t.navBlog}
            </Link>
          </div>

          <p className="text-gray-400 font-light flex items-center gap-4">
            <span>{t.footerDesc}</span>
            <Link to="/admin" className="text-transparent hover:text-white/20 transition-colors select-none" aria-label="Admin Dashboard" title="Admin">
              •
            </Link>
          </p>
          
          <p className="font-light">
            &copy; 2026 RedStream. {t.footerRights}
          </p>
        </div>
      </footer>
    </div>
  );
}

let globalDynamicPostsCache: any[] | null = null;
let globalDynamicPostsPromise: Promise<any> | null = null;

export const prefetchDynamicPosts = (forceRefresh = false) => {
  if (globalDynamicPostsPromise && !forceRefresh) return globalDynamicPostsPromise;
  
  const endpoint = '/api/seo/blog-posts';

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

function BlogListRoute() {
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
    const staticPosts = loadBlogPosts().filter((post) => post.lang === currentLang);
    const staticSlugs = new Set(staticPosts.map(p => p.slug));

    const convertedDynamic = dynamicPosts
      .filter((dp: any) => !staticSlugs.has(dp.slug))
      .map((dp: any) => ({
        slug: dp.slug,
        lang: 'en' as Language, // default dynamic articles to English as they are generated for SEO
        title: dp.title,
        date: dp.date || (dp.created_at ? new Date(dp.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
        author: dp.author || 'RedStream Expert',
        tags: dp.tags || [],
        description: dp.description || '',
        content: dp.content,
        readingTime: Math.max(1, Math.ceil((dp.content || '').split(/\s+/).length / 200)),
      }));
    return [...staticPosts, ...convertedDynamic];
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

function BlogPostRoute() {
  const { lang, slug } = useParams<{ lang: string, slug: string }>();
  const currentLang = (validLanguages.includes(lang as Language) ? lang : 'en') as Language;
  const t = useMemo(() => translations[currentLang], [currentLang]);
  const navigate = useNavigate();
  const [dynamicPost, setDynamicPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleDynamicPost = async () => {
      const staticPost = loadBlogPosts().find((p) => p.slug === slug && p.lang === currentLang);
      if (staticPost) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const endpoint = `/api/seo/blog-posts/${slug}`;

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
    return staticPost || dynamicPost;
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

function HomeRoute() {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (validLanguages.includes(lang as Language) ? lang : 'en') as Language;
  const navigate = useNavigate();

  const changeLanguage = (newLang: Language) => {
    navigate(`/${newLang}/home`);
  };

  return <Home currentLang={currentLang} onChangeLanguage={changeLanguage} onNavigate={(path) => navigate(path)} />;
}

// Wrapper to set HTML lang and dir attributes based on the route
function LangManager({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = validLanguages.includes(lang as Language) ? lang as Language : 'en';
  const location = useLocation();

  useEffect(() => {
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;

    // Remove existing canonical and hreflang tags to prevent duplicates
    document.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach(el => el.remove());

    const baseUrl = 'https://www.red-stream.store';
    
    // Normalize path to prevent keyword cannibalization on root/home
    let normalizedPath = location.pathname;
    if (normalizedPath === '/en/home' || normalizedPath === '/en' || normalizedPath === '/en/') {
      normalizedPath = '/';
    } else if (normalizedPath.endsWith('/') && normalizedPath.length > 1) {
      normalizedPath = normalizedPath.slice(0, -1); // Remove trailing slash
    }

    // Create new canonical tag (Self-referencing)
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `${baseUrl}${normalizedPath}`);
    document.head.appendChild(canonicalLink);

    // Synchronize og:url meta tag with canonical URL
    let ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (!ogUrlTag) {
      ogUrlTag = document.createElement('meta');
      ogUrlTag.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlTag);
    }
    ogUrlTag.setAttribute('content', `${baseUrl}${normalizedPath}`);

    // Create hreflang tags for all valid languages
    validLanguages.forEach((l) => {
      const alternateLink = document.createElement('link');
      alternateLink.setAttribute('rel', 'alternate');
      alternateLink.setAttribute('hreflang', l);
      
      let newPath = '';
      if (normalizedPath === '/') {
        newPath = l === 'en' ? '/' : `/${l}/home`;
      } else {
        newPath = location.pathname.replace(/^\/[^\/]+/, `/${l}`);
      }
      
      alternateLink.setAttribute('href', `${baseUrl}${newPath}`);
      document.head.appendChild(alternateLink);
    });
    
    // Add x-default hreflang pointing to English fallback
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    const xDefaultPath = normalizedPath === '/' ? '/' : location.pathname.replace(/^\/[^\/]+/, '/en');
    xDefault.setAttribute('href', `${baseUrl}${xDefaultPath}`);
    document.head.appendChild(xDefault);

  }, [currentLang, location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-[#FF1E27] selection:text-white transition-colors duration-200">
      <Routes>
        {/* Specific explicit route without the main layout wrapper */}
        <Route path="/admin" element={<SecretSeoAdmin />} />
        <Route path="/secret-seo-admin" element={<Navigate to="/admin" replace />} />
        
        {/* Root Route without redirect */}
        <Route path="/" element={<LangManager><HomeRoute /></LangManager>} />
        
        {/* Language Routes */}
        <Route path="/:lang" element={<LangManager><Outlet /></LangManager>}>
          {/* Default to home when accessing /:lang directly */}
          <Route index element={<CatchAllRedirect />} />
          
          {/* Home doesn't use the standard Header/Footer layout */}
          <Route path="home" element={<HomeRoute />} />
          
          {/* Main Layout wraps other views like blog */}
          <Route element={<MainLayout />}>
             <Route path="blog" element={<BlogListRoute />} />
             <Route path="blog/:slug" element={<BlogPostRoute />} />
             {/* Redirect any other path inside /:lang to /:lang/home */}
             <Route path="*" element={<CatchAllRedirect />} />
          </Route>
        </Route>
        
        {/* HTML Sitemap Route */}
        <Route element={<MainLayout />}>
          <Route path="/sitemap" element={<HtmlSitemap />} />
        </Route>

        {/* Catch-all redirect mapped to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
