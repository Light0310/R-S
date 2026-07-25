const fs = require('fs');
let code = fs.readFileSync('src/components/Home.tsx', 'utf8');

const regex = /\{Object\.entries\(languageNames\)\.map\(\(\[key, value\]\) => \([\s\S]*?<\/button>\s*\)\)\}/;
const langNew = `{Object.entries(languageNames).map(([key, value]) => (
                      <a
                        key={key}
                        href={key === 'en' ? '/' : \`/\${key}/home\`}
                        onClick={(e) => {
                          e.preventDefault();
                          onChangeLanguage && onChangeLanguage(key as Language);
                          setLangDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: currentLang === key ? 'rgba(255, 30, 39, 0.1)' : 'transparent',
                          color: currentLang === key ? '#FF1E27' : '#d1d5db',
                          fontWeight: currentLang === key ? 'bold' : 'normal',
                          cursor: 'pointer',
                          textDecoration: 'none'
                        }}
                      >
                        <span style={{ fontSize: '14px' }}>{value.flag}</span>
                        <span>{value.native}</span>
                      </a>
                    ))}`;

code = code.replace(regex, langNew);
fs.writeFileSync('src/components/Home.tsx', code);
console.log('Home.tsx patched');
