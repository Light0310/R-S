const fs = require('fs');

let content = fs.readFileSync('src/pages/SecretSeoAdmin.tsx', 'utf-8');

const generatorUiOld = `          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1E27]/5 rounded-full blur-3xl group-hover:bg-[#FF1E27]/10 transition-colors"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF1E27] to-[#8A1015] flex items-center justify-center shadow-lg shadow-[#FF1E27]/20">
                  <Cpu className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">AI Content Engine</h2>
                  <p className="text-gray-400 text-sm mt-1">Generate complete SEO-optimized blog posts using Gemini</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Custom Topic (Optional)</label>
                  <input 
                    type="text" 
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="e.g. Best settings for IPTV Smarters Pro"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF1E27] transition-colors"
                  />
                  <p className="text-[11px] text-gray-500">Leave blank to let AI auto-pick from the SEO queue or curated list.</p>
                </div>
                
                <button 
                  onClick={() => handleGenerateContent()}
                  disabled={generationLoading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-white/5"
                >
                  {generationLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Synthesizing Data...
                    </>
                  ) : (
                    <>
                      <Wand2 size={18} />
                      Generate Article Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>`;

const generatorUiNew = `          <div className="bg-[#111111] border border-[#FF1E27]/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden group shadow-lg shadow-[#FF1E27]/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1E27]/10 rounded-full blur-3xl transition-colors"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF1E27] to-[#8A1015] flex items-center justify-center shadow-lg shadow-[#FF1E27]/20 relative">
                    <Cpu className="text-white relative z-10" size={24} />
                    <div className="absolute inset-0 bg-[#FF1E27] blur-md opacity-40 rounded-xl animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">AI SEO Autopilot</h2>
                    <p className="text-green-400 text-sm mt-1 flex items-center gap-1 font-medium">
                      <Sparkles size={14} /> Never repeats topics. 100% Unique.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#FF1E27]/10">
                  <h3 className="text-white text-sm font-bold mb-2">Auto-Pilot Mode</h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    The AI will analyze all existing blog posts, find a highly searched IPTV/Streaming keyword you haven't covered yet, and generate a fully SEO-optimized 1000+ word article automatically.
                  </p>
                  <button 
                    onClick={() => handleGenerateContent()}
                    disabled={generationLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FF1E27] to-[#D01018] text-white hover:from-[#E01A22] hover:to-[#B00D13] transition-all disabled:opacity-50 shadow-lg shadow-[#FF1E27]/20"
                  >
                    {generationLoading && !customTopic ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Synthesizing Unique SEO Topic...
                      </>
                    ) : (
                      <>
                        <Wand2 size={18} />
                        Auto-Generate Unique SEO Article
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Or Force Custom Topic</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="e.g. Best settings for IPTV Smarters Pro"
                      className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF1E27] transition-colors"
                    />
                    <button 
                      onClick={() => handleGenerateContent(customTopic)}
                      disabled={generationLoading || !customTopic.trim()}
                      className="px-4 py-2 rounded-lg font-bold text-xs bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      Generate Specific
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

if (content.includes('Leave blank to let AI auto-pick')) {
  content = content.replace(generatorUiOld, generatorUiNew);
  fs.writeFileSync('src/pages/SecretSeoAdmin.tsx', content);
  console.log('UI Patched Successfully');
} else {
  console.log('Target string not found in SecretSeoAdmin.tsx');
}
