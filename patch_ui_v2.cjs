const fs = require('fs');

let content = fs.readFileSync('src/pages/SecretSeoAdmin.tsx', 'utf-8');

const oldSection = `<div className="flex items-center gap-2">
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
                </div>`;

const newSection = `<div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleGenerateContent()}
                    disabled={generationLoading && !customTopic}
                    className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-[#FF1E27] to-[#D01018] hover:from-[#e0141d] hover:to-[#B00D13] text-white rounded-xl text-sm font-black transition-all shadow-xl shadow-[#FF1E27]/30 disabled:opacity-50 cursor-pointer"
                  >
                    {generationLoading && !customTopic ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                    {generationLoading && !customTopic ? 'Synthesizing Unique Topic...' : 'Auto-Generate Unique SEO Article'}
                  </button>
                  <p className="text-[11px] text-green-400 font-medium">✨ Automatically avoids duplicate topics & optimizes for Google Search.</p>
                </div>`;

content = content.replace(oldSection, newSection);
fs.writeFileSync('src/pages/SecretSeoAdmin.tsx', content);
