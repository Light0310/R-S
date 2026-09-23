import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COUNTRIES_DATA } from '../data/geoCountries';
import { 
  Tv, 
  Wifi, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  Server, 
  Clock, 
  MessageSquare, 
  Globe2, 
  Star,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import DownloaderCodes from './DownloaderCodes';

export default function GeoLandingPage() {
  const { country } = useParams<{ country: string }>();
  const config = country ? COUNTRIES_DATA[country.toLowerCase()] : null;

  useEffect(() => {
    if (config) {
      document.title = config.metaTitle;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', config.metaDesc);

      // JSON-LD Localized Schema Injection
      const schemaScriptId = 'geo-schema-jsonld';
      const existingScript = document.getElementById(schemaScriptId);
      if (existingScript) existingScript.remove();

      const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            "@id": `https://www.red-stream.store/iptv-${config.slug}#product`,
            "name": `RedStream™ Premium IPTV ${config.name}`,
            "description": config.metaDesc,
            "image": "https://www.red-stream.store/ultimate_streaming_setup_guide.svg",
            "brand": {
              "@type": "Brand",
              "name": "RedStream™"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": config.currency,
              "lowPrice": "1.99",
              "highPrice": "49.00",
              "offerCount": "4",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "bestRating": "5",
              "ratingCount": "284"
            }
          },
          {
            "@type": "Service",
            "name": `4K Streaming & IPTV Subscription in ${config.name}`,
            "provider": {
              "@type": "Organization",
              "name": "RedStream™ IPTV"
            },
            "areaServed": {
              "@type": "Country",
              "name": config.name
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": `${config.name} Streaming Packages`,
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "12 Months VIP 4K Pass"
                  },
                  "price": "49.00",
                  "priceCurrency": config.currency
                }
              ]
            }
          }
        ]
      };

      const script = document.createElement('script');
      script.id = schemaScriptId;
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }
  }, [config]);

  if (!config) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4 text-white">Country Page Not Found</h1>
        <p className="text-gray-400 mb-6">Explore our global streaming servers and plans.</p>
        <Link to="/" className="px-6 py-3 bg-[#FF1E27] text-white font-bold rounded-xl shadow-lg">
          Return to Home
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello RedStream! I want to activate my 4K IPTV subscription for ${config.name} (${config.currencySymbol}).`
  );
  const whatsappUrl = `https://wa.me/212694843943?text=${whatsappMessage}`;

  return (
    <div className="w-full bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF1E27]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF1E27] font-extrabold mb-4">
            <span className="text-xl">{config.flag}</span>
            <span>Optimized Regional Server Cluster • {config.primaryCity} Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 max-w-4xl">
            {config.headline}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-3xl leading-relaxed">
            {config.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#FF1E27] hover:bg-[#d91921] text-white font-bold rounded-xl transition-all shadow-[0_0_25px_rgba(255,30,39,0.4)] flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <MessageSquare size={18} />
              <span>Instant WhatsApp Activation</span>
              <ArrowRight size={16} />
            </a>
            
            <a
              href="#pricing"
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all text-sm sm:text-base cursor-pointer"
            >
              View {config.name} Pricing
            </a>
          </div>

          {/* Quick Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#FF1E27] shrink-0" />
              <span>Anti-Freeze 9.0 Active</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#FF1E27] shrink-0" />
              <span>Bypass {config.localISPs[0]} Throttling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#FF1E27] shrink-0" />
              <span>True 4K UHD 60 FPS</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#FF1E27] shrink-0" />
              <span>Instant Test Pass (€1.99)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Local Channels & Sports Highlight */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Exclusive {config.name} Live Sports & Premium Channels
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Never miss a match or local broadcast. Dedicated high-bitrate feeds with multiple audio commentaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Channels Card */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#FF1E27]/10 rounded-xl text-[#FF1E27]">
                <Tv size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">Featured Local Channels</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {config.localChannels.map((channel, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 px-3 py-2.5 rounded-lg text-xs font-semibold text-gray-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{channel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sports Leagues Card */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Zap size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">Included Live Tournaments</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.localSports.map((sport, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 px-3 py-2.5 rounded-lg text-xs font-semibold text-gray-200">
                  <Star size={13} className="text-[#FF1E27]" />
                  <span>{sport}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ISP Compatibility & Anti-Freeze Explanation */}
      <section className="py-16 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#FF1E27]">
                No VPN Required
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-4">
                Full Compatibility with {config.name} Internet Providers
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                Most standard IPTV services freeze during peak match times because regional ISPs detect and throttle streaming traffic. RedStream uses encrypted Tier-1 European transit nodes that completely prevent packet throttling on:
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {config.localISPs.map((isp, idx) => (
                  <span key={idx} className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
                    🛡️ {isp}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Guaranteed smooth streaming on all fiber, cable, 4G, and 5G connections without needing an external VPN.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 text-center">
              <Server size={36} className="text-[#FF1E27] mx-auto mb-3" />
              <div className="text-3xl font-black text-white">99.9%</div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4">
                European Cluster Uptime
              </div>
              <div className="text-xs text-emerald-400 bg-emerald-500/10 py-1.5 px-3 rounded-lg font-bold inline-block">
                All Servers Operational
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloader Codes Component */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <DownloaderCodes />
      </div>

      {/* Pricing Table Section */}
      <section id="pricing" className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#FF1E27]">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-4xl font-black mt-2 mb-3">
            Choose Your {config.name} VIP Plan
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Instant WhatsApp delivery with M3U link, Xtream Codes credentials, and step-by-step setup assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trial / 1 Month */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">1 Month Pass</h3>
              <p className="text-xs text-gray-400 mb-4">Great for testing our servers</p>
              <div className="text-3xl font-black text-white mb-6">
                12.00 {config.currencySymbol}
              </div>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FF1E27]" />
                  <span>20,000+ Worldwide Channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FF1E27]" />
                  <span>60,000+ VOD Movies & Series</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FF1E27]" />
                  <span>Anti-Freeze 9.0 Included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FF1E27]" />
                  <span>All {config.name} Sports Feeds</span>
                </li>
              </ul>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-3 text-center bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all"
            >
              Order 1 Month
            </a>
          </div>

          {/* 12 Months VIP (Best Seller) */}
          <div className="bg-gradient-to-b from-[#1a1112] to-[#141414] border-2 border-[#FF1E27] rounded-2xl p-6 flex flex-col justify-between relative shadow-[0_0_30px_rgba(255,30,39,0.2)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF1E27] text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full tracking-wider">
              Most Popular in {config.name}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1 text-white">12 Months VIP</h3>
              <p className="text-xs text-gray-400 mb-4">Complete 4K sports & cinema access</p>
              <div className="text-3xl font-black text-[#FF1E27] mb-6">
                49.00 {config.currencySymbol}
              </div>
              <ul className="space-y-2.5 text-xs text-gray-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Maximum Discount (Save over 65%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Full 4K Ultra HD & 60 FPS Streams</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Priority WhatsApp VIP Concierge</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Real-time EPG & Catch-up TV</span>
                </li>
              </ul>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-3 text-center bg-[#FF1E27] hover:bg-[#d91921] text-white font-bold text-xs rounded-xl transition-all shadow-lg cursor-pointer"
            >
              Get 12 Months VIP Pass
            </a>
          </div>

          {/* 6 Months Plan */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">6 Months Plan</h3>
              <p className="text-xs text-gray-400 mb-4">Ideal for the full football season</p>
              <div className="text-3xl font-black text-white mb-6">
                39.00 {config.currencySymbol}
              </div>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FF1E27]" />
                  <span>Full Sports Coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FF1E27]" />
                  <span>Smart TV & Firestick Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FF1E27]" />
                  <span>Anti-Freeze 9.0 Protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FF1E27]" />
                  <span>Fast WhatsApp Support</span>
                </li>
              </ul>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-3 text-center bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all"
            >
              Order 6 Months
            </a>
          </div>
        </div>
      </section>

      {/* Regional FAQ Section */}
      <section className="py-16 bg-[#0c0c0c] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions in {config.name}
          </h2>

          <div className="space-y-4">
            <div className="bg-[#141414] border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-sm sm:text-base text-white mb-2">
                Will RedStream work with my {config.name} internet provider?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Yes, completely. Our European server network dynamically bypasses deep packet inspection from {config.localISPs.join(', ')} so you enjoy high bitrate 4K streams with zero throttling.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-sm sm:text-base text-white mb-2">
                How do I receive my credentials?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Immediately after ordering, our human support team connects with you on WhatsApp (+212694843943) and delivers your Xtream Codes API login, M3U playlist, and EPG URL within 5 to 10 minutes.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-sm sm:text-base text-white mb-2">
                Can I try the service before buying the 12-month pass?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Yes, we offer an instant 24-hour test pass for only €1.99 so you can test {config.localChannels.slice(0, 3).join(', ')} on your television or Firestick before committing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
