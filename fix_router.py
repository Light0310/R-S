import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace Hash Routing State comment
content = content.replace("// Hash Routing State", "// Browser Routing State")

# Replace window.location.hash logic with react-router-dom
# We need to add the imports at the top
content = content.replace("import { useState, useEffect, useMemo } from 'react';", "import { useState, useEffect, useMemo } from 'react';\nimport { useLocation, useNavigate } from 'react-router-dom';")

content = content.replace("const parseHash = (hash: string): Route => {\n    const cleanHash = hash.replace(/^#\/?/, '');", "const parsePath = (pathname: string): Route => {\n    const cleanPath = pathname.replace(/^\\/?/, '');")

# Detect browser language if no hash exists -> no path exists
content = content.replace("// Detect browser language if no hash exists", "// Detect browser language if no path exists")

# Find the useEffect for handleHashChange and replace it
use_effect_pattern = re.compile(r"// Enforce structured hash URLs on hash change or mount.*?window\.removeEventListener\('hashchange', handleHashChange\);\n  }, \[\]\);", re.DOTALL)

new_use_effect = """// Enforce structured path URLs on location change or mount
  const location = useLocation();
  const routerNavigate = useNavigate();

  useEffect(() => {
    const pathname = location.pathname;
    const hash = location.hash;
    
    // If it is a local anchor link on the landing page (e.g., #features, #pricing)
    // let the landing page component handle smooth scrolling naturally
    if (hash && hash.startsWith('#') && pathname === '/') {
       // but we still need a default lang
    }

    const parsed = parsePath(pathname);
    
    const targetPath = parsed.view === 'post'
      ? `/${parsed.lang}/blog/${parsed.slug}`
      : `/${parsed.lang}/${parsed.view}`;
      
    if (pathname !== targetPath) {
      routerNavigate(targetPath, { replace: true });
    }
    
    setRoute(parsed);
  }, [location.pathname, location.hash, routerNavigate]);"""

content = use_effect_pattern.sub(new_use_effect, content)

# Replace navigate helper
navigate_pattern = re.compile(r"// Navigate helper that preserves language and format hashes safely.*?window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\);\n  };", re.DOTALL)

new_navigate = """// Navigate helper that preserves language and format paths safely
  const navigate = (view: View, slug?: string) => {
    if (view === 'post' && slug) {
      routerNavigate(`/${route.lang}/blog/${slug}`);
    } else {
      routerNavigate(`/${route.lang}/${view}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };"""

content = navigate_pattern.sub(new_navigate, content)

# Replace changeLanguage helper
change_language_pattern = re.compile(r"// Change language helper, updates Hash path smoothly, retaining current page view and slug!.*?window\.location\.hash = `#/\$\{newLang\}/\$\{route\.view\}`;\n    }\n  };", re.DOTALL)

new_change_language = """// Change language helper, updates path smoothly, retaining current page view and slug!
  const changeLanguage = (newLang: Language) => {
    setLangDropdownOpen(false);
    if (route.view === 'post' && route.slug) {
      routerNavigate(`/${newLang}/blog/${route.slug}`);
    } else {
      routerNavigate(`/${newLang}/${route.view}`);
    }
  };"""

content = change_language_pattern.sub(new_change_language, content)

with open("src/App.tsx", "w") as f:
    f.write(content)

