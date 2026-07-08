new_content = """/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Language } from './types';
import { loadBlogPosts } from './blog';
import { translations } from './translations';

// Components
import Home from './components/Home';
import BlogList from './components/BlogList';
import BlogPostComponent from './components/BlogPost';
import SecretSeoAdmin from './pages/SecretSeoAdmin';

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
          <div 
             onClick={() => handleNavigate('home')} 
             className="flex items-center gap-2 cursor-pointer select-none"
          >
            <svg className="w-7 h-7 filter drop-shadow(0 0 5px rgba(255,30,39,0.5))" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(16, 16) scale(0.93)">
                <path d="M 120 140 L 340 140 A 75 75 0 0 1 415 215 A 75 75 0 0 1 340 290 L 280 290 L 400 380 L 330 380 L 225 300 L 150 380 L 105 380 L 205 300 L 245 250 L 340 250 A 35 35 0 0 0 375 215 A 35 35 0 0 0 340 180 L 160 180 Z" fill="#FF1E27" />
                <polygon points="120,200 200,245 120,290" fill="#FFFFFF" />
              </g>
            </svg>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Red<span className="text-[#FF1E27]">Stream</span>
            </span>
          </div>

          {/* Navigation Center Links */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavigate('home')}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:text-[#FF1E27] text-gray-300 cursor-pointer"
            >
              {t.navHome}
            </button>
            <button
              onClick={() => handleNavigate('blog')}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all text-[#FF1E27] bg-[#FF1E27]/10 cursor-pointer"
            >
              {t.navBlog}
            </button>
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
                        <button
                          key={key}
                          onClick={() => changeLanguage(key as Language)}
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
                        </button>
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
        <button 
           onClick={() => handleNavigate('home')}
          className="hover:text-white cursor-pointer"
        >
          {t.navHome}
        </button>
        <span>•</span>
        <button 
           onClick={() => handleNavigate('blog')}
          className={`hover:text-white cursor-pointer ${isBlogActive ? 'text-[#FF1E27]' : ''}`}
        >
          {t.navBlog}
        </button>
      </div>

      {/* Main Container Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
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
          
          <p className="text-gray-400 font-light">{t.footerDesc}</p>
          
          <p className="font-light">
            &copy; 2026 RedStream. {t.footerRights}
          </p>
        </div>
      </footer>
    </div>
  );
}

function BlogListRoute() {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (validLanguages.includes(lang as Language) ? lang : 'en') as Language;
  const t = useMemo(() => translations[currentLang], [currentLang]);
  const navigate = useNavigate();

  const currentLangPosts = useMemo(() => {
    return loadBlogPosts().filter((post) => post.lang === currentLang);
  }, [currentLang]);

  const onNavigate = (view: string, slug?: string) => {
    if (view === 'post' && slug) {
      navigate(`/${currentLang}/blog/${slug}`);
    } else {
      navigate(`/${currentLang}/${view}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <BlogList posts={currentLangPosts} lang={currentLang} t={t} onNavigate={onNavigate} />;
}

function BlogPostRoute() {
  const { lang, slug } = useParams<{ lang: string, slug: string }>();
  const currentLang = (validLanguages.includes(lang as Language) ? lang : 'en') as Language;
  const t = useMemo(() => translations[currentLang], [currentLang]);
  const navigate = useNavigate();

  const currentLangPosts = useMemo(() => {
    return loadBlogPosts().filter((post) => post.lang === currentLang);
  }, [currentLang]);

  const activePost = useMemo(() => {
    return currentLangPosts.find((p) => p.slug === slug);
  }, [slug, currentLangPosts]);

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

  return <Home currentLang={currentLang} onChangeLanguage={changeLanguage} />;
}

// Wrapper to set HTML lang and dir attributes based on the route
function LangManager({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = validLanguages.includes(lang as Language) ? lang as Language : 'en';

  useEffect(() => {
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  return <>{children}</>;
}

export default function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-[#FF1E27] selection:text-white transition-colors duration-200">
      <Routes>
        {/* Specific explicit route without the main layout wrapper */}
        <Route path="/secret-seo-admin" element={<SecretSeoAdmin />} />
        
        {/* Language Routes */}
        <Route path="/:lang" element={<LangManager><Outlet /></LangManager>}>
          {/* Home doesn't use the standard Header/Footer layout */}
          <Route path="home" element={<HomeRoute />} />
          
          {/* Main Layout wraps other views like blog */}
          <Route element={<MainLayout />}>
             <Route path="blog" element={<BlogListRoute />} />
             <Route path="blog/:slug" element={<BlogPostRoute />} />
             {/* Redirect any other path inside /:lang to /:lang/home */}
             <Route path="*" element={<Navigate to="home" replace />} />
          </Route>
        </Route>
        
        {/* Catch-all redirect mapped to default language */}
        <Route path="*" element={<Navigate to="/en/home" replace />} />
      </Routes>
    </div>
  );
}
"""

with open("src/App.tsx", "w") as f:
    f.write(new_content)
