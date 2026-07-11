import React, { useState } from 'react';

const codes = [
  { name: 'IBO Player', code: '1171959', note: 'Alt codes: 191060 / 923441', badge: null },
  { name: 'IboPro', code: '481220', note: null, badge: null },
  { name: 'Vu Player Pro', code: '327187', note: null, badge: 'Official' },
  { name: 'Smarters Pro', code: '702807', note: 'Alt: 5336197', badge: null },
  { name: 'Set IPTV', code: '183103', note: null, badge: null },
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
    <section className="py-16 bg-[#050505] border-t border-white/5 relative z-10" id="downloader-codes">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Quick Downloader Codes</h2>
          <p className="text-gray-400">Instantly install our recommended apps on your Smart TV or Android device.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {codes.map((app, index) => (
            <div key={index} className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-[#e50914]/50 transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#e50914] opacity-5 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform"></div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {app.name}
                  {app.badge && (
                    <span className="text-[10px] uppercase tracking-wider bg-[#e50914]/20 text-[#e50914] px-2 py-1 rounded-full font-bold">
                      {app.badge}
                    </span>
                  )}
                </h3>
              </div>
              
              <div className="flex items-center justify-between bg-black/50 p-4 rounded-lg mb-3 border border-white/5">
                <span className="font-mono text-2xl tracking-widest text-white font-bold">{app.code}</span>
                <button 
                  onClick={() => handleCopy(app.code)}
                  className={`px-4 py-2 rounded-md font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                    copiedCode === app.code 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                      : 'bg-white/10 text-white hover:bg-[#e50914] hover:text-white border border-transparent'
                  }`}
                >
                  {copiedCode === app.code ? 'Copied! ✅' : 'Copy'}
                </button>
              </div>
              
              {app.note && <p className="text-xs text-gray-500 font-medium">{app.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
