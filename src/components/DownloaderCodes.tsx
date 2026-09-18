import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';

const codes = [
  { name: 'IBO Player', code: '1171959', note: 'Alt codes: 191060 / 923441', badge: 'Popular' },
  { name: 'IboPro Player', code: '481220', note: 'Direct APK Fast Download', badge: null },
  { name: 'Vu Player Pro', code: '327187', note: 'Ultra HD 4K Certified', badge: 'Official' },
  { name: 'IPTV Smarters Pro', code: '702807', note: 'Alt: 5336197 (v3.1.5)', badge: 'Top Rated' },
  { name: 'XCIPTV Player', code: '834339', note: 'Built-in Multi-screen Engine', badge: null },
  { name: 'Set IPTV', code: '183103', note: 'Quick Setup for Smart TVs', badge: null },
];

export default function DownloaderCodes() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  return (
    <section className="downloader-section py-20 bg-[#070709] border-t border-white/5 relative z-10" id="downloader-codes">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#e50914]/15 border border-[#e50914]/30 text-[#ff4d4d] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Download className="w-3.5 h-3.5" />
            <span>Downloader App Shortcodes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Quick Downloader Codes
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Enter these numerical codes into the <strong className="text-white">Downloader by AFTVnews</strong> app on your Firestick, Smart TV, or Android TV box to install directly.
          </p>
        </div>

        <div className="downloader-grid">
          {codes.map((app, index) => (
            <div key={index} className="downloader-card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {app.name}
                </h3>
                {app.badge && (
                  <span className="text-[10px] uppercase tracking-wider bg-[#e50914]/20 border border-[#e50914]/40 text-[#ff4d4d] px-2 py-0.5 rounded-full font-bold">
                    {app.badge}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between bg-black/60 p-3.5 rounded-xl my-2 border border-white/10 shadow-inner">
                <span className="font-mono text-2xl tracking-wider text-white font-extrabold">{app.code}</span>
                <button 
                  onClick={() => handleCopy(app.code)}
                  className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    copiedCode === app.code 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                      : 'bg-white/10 text-white hover:bg-[#e50914] hover:text-white border border-transparent shadow-sm'
                  }`}
                  aria-label={`Copy code ${app.code}`}
                >
                  {copiedCode === app.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-xs text-gray-400 font-medium mt-1">{app.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
