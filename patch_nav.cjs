const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const navOld = `            <Link
              to={\`/\${currentLang}/blog\`}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all text-[#FF1E27] bg-[#FF1E27]/10 cursor-pointer"
            >
              {t.navBlog}
            </Link>
          </nav>`;

const navNew = `            <Link
              to={\`/\${currentLang}/blog\`}
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
          </nav>`;

const langOld = `                      {Object.entries(languageNames).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => changeLanguage(key as Language)}
                          className={\`w-full text-start flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer \${
                            currentLang === key
                              ? 'bg-[#FF1E27]/10 text-[#FF1E27] font-bold'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }\`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{value.flag}</span>
                            <span>{value.native}</span>
                          </span>
                          {currentLang === key && <CheckCircle2 size={13} className="text-[#FF1E27]" />}
                        </button>
                      ))}`;

const langNew = `                      {Object.entries(languageNames).map(([key, value]) => (
                        <Link
                          key={key}
                          to={location.pathname === '/' && key !== 'en' ? \`/\${key}/home\` : location.pathname.replace(new RegExp(\`^/(\${validLanguages.join('|')})\`), \`/\${key}\`)}
                          onClick={() => setLangDropdownOpen(false)}
                          className={\`w-full text-start flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer \${
                            currentLang === key
                              ? 'bg-[#FF1E27]/10 text-[#FF1E27] font-bold'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }\`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{value.flag}</span>
                            <span>{value.native}</span>
                          </span>
                          {currentLang === key && <CheckCircle2 size={13} className="text-[#FF1E27]" />}
                        </Link>
                      ))}`;

code = code.replace(navOld, navNew).replace(langOld, langNew);
fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx patched');
