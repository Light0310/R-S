import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, X } from 'lucide-react';

interface PurchaseNotification {
  city: string;
  country: string;
  flag: string;
  plan: string;
  timeAgo: string;
}

const RECENT_ACTIVATIONS: PurchaseNotification[] = [
  { city: 'Paris', country: 'France', flag: '🇫🇷', plan: '12 Months VIP (4K)', timeAgo: '6 mins ago' },
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧', plan: '24h VIP Test Pass', timeAgo: '14 mins ago' },
  { city: 'Brussels', country: 'Belgium', flag: '🇧🇪', plan: '12 Months VIP (4K)', timeAgo: '21 mins ago' },
  { city: 'Madrid', country: 'Spain', flag: '🇪🇸', plan: '6 Months Full Season', timeAgo: '34 mins ago' },
  { city: 'Geneva', country: 'Switzerland', flag: '🇨🇭', plan: '12 Months VIP (4K)', timeAgo: '42 mins ago' },
  { city: 'Lyon', country: 'France', flag: '🇫🇷', plan: '12 Months VIP (4K)', timeAgo: '49 mins ago' },
  { city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', plan: '24h VIP Test Pass', timeAgo: '55 mins ago' }
];

export default function SocialProofWidget() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [shownCount, setShownCount] = useState(0);

  useEffect(() => {
    // 1. First trigger only after 14 seconds (Natural UX, non-intrusive)
    const initialTimer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
        setShownCount((c) => c + 1);

        // Auto-hide after 5.5 seconds of viewing
        setTimeout(() => {
          setIsVisible(false);
        }, 5500);
      }
    }, 14000);

    // 2. Calm recurring interval: Shows every 38 seconds, max 3 times total
    const recurringInterval = setInterval(() => {
      if (isDismissed) return;

      setShownCount((count) => {
        if (count >= 3) {
          // Stop showing once maximum 3 subtle notifications have been shown to this visitor
          clearInterval(recurringInterval);
          return count;
        }

        setCurrentIdx((prev) => (prev + 1) % RECENT_ACTIVATIONS.length);
        setIsVisible(true);

        // Auto-hide after 5.5 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 5500);

        return count + 1;
      });
    }, 38000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringInterval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const item = RECENT_ACTIVATIONS[currentIdx];

  return (
    <div
      className={`fixed bottom-24 left-4 z-40 max-w-[310px] sm:max-w-[340px] transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
      aria-live="polite"
    >
      <div className="relative bg-[#121212]/95 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-[0_12px_32px_rgba(0,0,0,0.65)] flex items-center gap-3 pr-8">
        {/* Close Button for User Control */}
        <button
          onClick={() => {
            setIsVisible(false);
            setIsDismissed(true);
          }}
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
          aria-label="Dismiss notification"
          title="Dismiss"
        >
          <X size={13} />
        </button>

        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF1E27]/15 to-emerald-500/15 border border-white/10 flex items-center justify-center text-lg select-none">
            {item.flag}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#121212] rounded-full" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-[11px] font-bold text-white truncate">
              {item.city}, {item.country}
            </span>
            <span className="text-[9px] text-gray-400 shrink-0">{item.timeAgo}</span>
          </div>

          <p className="text-[11px] text-gray-300 font-medium truncate flex items-center gap-1">
            <Zap size={11} className="text-[#FF1E27] shrink-0 fill-[#FF1E27]" />
            <span className="text-white font-semibold">{item.plan}</span>
          </p>

          <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-emerald-400 font-medium">
            <ShieldCheck size={10} className="shrink-0" />
            <span>Anti-Freeze Server Activated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
