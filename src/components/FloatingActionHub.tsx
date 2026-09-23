import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, Sparkles } from 'lucide-react';

interface FloatingActionHubProps {
  currentLang?: string;
}

export default function FloatingActionHub({ currentLang = 'en' }: FloatingActionHubProps) {
  const location = useLocation();

  // Smart Contextual Message Based on Exact Page Route
  const getContextualWhatsAppText = () => {
    const path = location.pathname.toLowerCase();

    if (path.includes('iptv-france')) {
      return 'Bonjour RedStream ! Je suis en France et je souhaite commander le serveur 4K (Canal+, DAZN, beIN) sans coupure.';
    }
    if (path.includes('iptv-uk')) {
      return 'Hello RedStream! I am located in the UK and would like to activate a 4K subscription for Premier League & Sky Sports.';
    }
    if (path.includes('iptv-belgique')) {
      return 'Bonjour RedStream ! Je souhaite commander un abonnement 4K pour la Belgique (Jupiler Pro League, RTBF, DAZN).';
    }
    if (path.includes('iptv-suisse')) {
      return 'Bonjour RedStream ! Je souhaite activer un abonnement 4K pour la Suisse (RTS, blue Sport) sur Swisscom.';
    }
    if (path.includes('iptv-espana')) {
      return '¡Hola RedStream! Estoy en España y quiero activar una suscripción 4K para LaLiga y Movistar+ sin cortes.';
    }
    if (path.includes('iptv-germany')) {
      return 'Hallo RedStream! Ich möchte ein 4K IPTV Abonnement für Deutschland (Bundesliga, Sky Sport) bestellen.';
    }
    if (path.includes('iptv-netherlands')) {
      return 'Hallo RedStream! Ik wil graag een 4K IPTV abonnement voor Nederland (Eredivisie, ESPN, Viaplay) bestellen.';
    }
    if (path.includes('tivimate') || path.includes('firestick')) {
      return 'Hello RedStream! I read your Firestick & TiviMate guide and want a 24h VIP Test Pass to configure my device.';
    }
    if (currentLang === 'fr') {
      return 'Bonjour RedStream ! Je souhaite tester votre abonnement 4K Anti-Freeze (Pass 24h ou 12 Mois VIP).';
    }
    if (currentLang === 'ar') {
      return 'مرحباً RedStream! أود الحصول على تجربة 24 ساعة VIP أو الاشتراك في باقة 12 شهر لمشاهدة المباريات بجودة 4K.';
    }

    return 'Hello RedStream! I am on your website and would like to get a 24h VIP test or subscribe to a 4K plan.';
  };

  const encodedMsg = encodeURIComponent(getContextualWhatsAppText());
  const whatsappUrl = `https://wa.me/212694843943?text=${encodedMsg}`;

  return (
    <aside aria-label="Quick Order Assistance" className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      {/* Quick Trial Pill Button (Visible on mobile & desktop) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-quick-trial-btn"
        className="hidden xs:flex items-center gap-2 bg-[#121212]/95 hover:bg-[#1f1f1f] text-white border border-[#FF1E27]/40 hover:border-[#FF1E27] py-2 px-3.5 rounded-full shadow-[0_4px_20px_rgba(255,30,39,0.25)] transition-all transform hover:-translate-y-0.5 backdrop-blur-md group"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E27] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF1E27]" />
        </span>
        <span className="text-xs font-bold tracking-tight group-hover:text-[#FF1E27] transition-colors">
          VIP Trial 24h • €1.99
        </span>
      </a>

      {/* Primary Floating WhatsApp Pulse Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        aria-label="Direct Human WhatsApp Activation"
        className="relative flex items-center justify-center w-[54px] h-[54px] sm:w-[58px] sm:h-[58px] bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.65)] transition-all transform hover:scale-105 active:scale-95"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.039c-5.5 0-9.961 4.461-9.961 9.961 0 1.758.469 3.477 1.348 4.984L2 22l5.168-1.348c1.469.824 3.141 1.258 4.832 1.258 5.5 0 9.961-4.461 9.961-9.961 0-5.5-4.461-9.961-9.961-9.961zm5.352 14.336c-.234.664-1.359 1.277-1.875 1.359-.492.078-1.125.109-3.563-.898-2.93-1.211-4.797-4.203-4.938-4.391-.141-.188-1.18-1.57-1.18-2.992 0-1.422.742-2.125 1.008-2.406.266-.281.578-.352.766-.352.188 0 .375.008.539.016.172.008.406-.063.633.484.234.547.742 1.828.813 1.969.07.141.117.305.023.492-.094.188-.141.305-.281.469-.141.164-.297.352-.422.484-.141.141-.297.297-.125.594.172.297.766 1.266 1.641 2.047 1.133 1.008 2.086 1.32 2.383 1.461.297.141.469.117.641-.07.172-.188.742-.867.945-1.164.203-.297.406-.25.68-.148.273.094 1.734.82 2.031.969.297.148.492.219.563.344.07.125.07.727-.164 1.391z" />
        </svg>
      </a>
    </aside>
  );
}
