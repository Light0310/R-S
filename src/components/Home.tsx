/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { getTranslatedLandingHTML } from './HomeTranslations';
import FAQSection from './FAQSection';
import DownloaderCodes from './DownloaderCodes';
import { useGeoLocation } from '../hooks/useGeoLocation';

const languageNames: Record<Language, { native: string; flag: string; label: string }> = {
  en: { native: 'English', flag: '🇬🇧', label: 'EN' },
  ar: { native: 'العربية', flag: '🇸🇦', label: 'AR' },
  es: { native: 'Español', flag: '🇪🇸', label: 'ES' },
  nl: { native: 'Nederlands', flag: '🇳🇱', label: 'NL' },
  fr: { native: 'Français', flag: '🇫🇷', label: 'FR' },
  ru: { native: 'Русский', flag: '🇷🇺', label: 'RU' },
  de: { native: 'Deutsch', flag: '🇩🇪', label: 'DE' },
};

const navTranslations: Record<Language, { home: string; features: string; pricing: string; faq: string; blog: string; cta: string }> = {
  en: { home: 'Home', features: 'Features', pricing: 'Pricing', faq: 'FAQ', blog: 'Blog', cta: 'Get Free Trial' },
  ar: { home: 'الرئيسية', features: 'المميزات', pricing: 'الأسعار', faq: 'الأسئلة الشائعة', blog: 'المدونة', cta: 'تجربة مجانية' },
  es: { home: 'Inicio', features: 'Características', pricing: 'Precios', faq: 'Preguntas Frecuentes', blog: 'Blog', cta: 'Prueba Gratis' },
  nl: { home: 'Home', features: 'Kenmerken', pricing: 'Prijzen', faq: 'FAQ', blog: 'Blog', cta: 'Gratis Test' },
  fr: { home: 'Accueil', features: 'Fonctionnalités', pricing: 'Tarifs', faq: 'FAQ', blog: 'Blog', cta: 'Essai gratuit' },
  ru: { home: 'Главная', features: 'Преимущества', pricing: 'Цены', faq: 'Вопросы', blog: 'Блог', cta: 'Бесплатный тест' },
  de: { home: 'Startseite', features: 'Funktionen', pricing: 'Preise', faq: 'FAQ', blog: 'Blog', cta: 'Kostenlose Testversion' }
};

interface HomeProps {
  currentLang?: Language;
  onChangeLanguage?: (lang: Language) => void;
  onNavigate?: (path: string) => void;
}

export default function Home({ currentLang = 'en', onChangeLanguage, onNavigate }: HomeProps) {
  useGeoLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    // 2. Smooth scroll offset adjustment for sticky header
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#') && !hash.startsWith('#/')) {
        const element = document.querySelector(hash);
        if (element) {
          const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);



    // Image state checkers for showcase
    const showcaseImgs = document.querySelectorAll('.showcase-slide img');
    showcaseImgs.forEach(img => {
      const image = img as HTMLImageElement;
      if (image.complete) {
        image.classList.add('loaded');
      } else {
        image.addEventListener('load', () => {
          image.classList.add('loaded');
        });
      }
    });

    const urlParams = new URLSearchParams(window.location.search);

    // Scroll to and highlight plan
    let targetCardId = '';
    const planParam = urlParams.get('plan')?.toLowerCase();
    const isTrialParam = urlParams.get('trial')?.toLowerCase() === 'true';

    if (isTrialParam || planParam === 'trial' || planParam === '24h' || planParam === '24hours') {
      targetCardId = 'plan-trial';
    } else if (planParam === '1month' || planParam === '1m' || planParam === 'one-month') {
      targetCardId = 'plan-1month';
    } else if (planParam === '6months' || planParam === '6m' || planParam === 'six-months') {
      targetCardId = 'plan-6months';
    } else if (planParam === '12months' || planParam === '12m' || planParam === 'one-year' || planParam === 'yearly') {
      targetCardId = 'plan-12months';
    }

    if (targetCardId) {
      const cardElement = document.getElementById(targetCardId);
      if (cardElement) {
        cardElement.classList.add('highlighted-plan-card');
        setTimeout(() => {
          const offsetPosition = cardElement.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 800);
      }
    }

    // Dynamic WhatsApp url tracking
    const whatsappAnchors = document.querySelectorAll('a[href*="wa.me"]');
    whatsappAnchors.forEach(anchor => {
      const originalHref = anchor.getAttribute('href');
      if (!originalHref) return;

      try {
        const urlObj = new URL(originalHref);
        const textParam = urlObj.searchParams.get('text') || '';
        
        const buttonId = anchor.id || '';
        let sourceName = 'General Link';
        let planName = 'None';

        if (buttonId === 'nav-cta-trial') {
          sourceName = 'Navigation Header Button';
          planName = 'Free Trial Request';
        } else if (buttonId === 'hero-main-cta') {
          sourceName = 'Hero Main CTA Button';
          planName = 'IPTV Subscription Inquiry';
        } else if (buttonId === 'btn-trial-order') {
          sourceName = 'Pricing Card Order Button';
          planName = '24 Hours Trial (2€)';
        } else if (buttonId === 'btn-1month-order') {
          sourceName = 'Pricing Card Order Button';
          planName = '1 Month Premium (12€)';
        } else if (buttonId === 'btn-6months-order') {
          sourceName = 'Pricing Card Order Button';
          planName = '6 Months Premium (29€)';
        } else if (buttonId === 'btn-12months-order') {
          sourceName = 'Pricing Card Order (Best Deal)';
          planName = '12 Months Premium (49€)';
        } else if (buttonId === 'floating-whatsapp-btn') {
          sourceName = 'Floating Pulsing Widget';
          planName = 'Support / General Inquiry';
        } else if (anchor instanceof HTMLElement && anchor.innerText.toLowerCase().includes('contact')) {
          sourceName = 'Footer Contact Link';
          planName = 'Footer Support';
        }

        const trackingInfo: string[] = [];
        const paramsToCheck = [
          'ref', 'source', 'utm_source', 'utm_medium', 'utm_campaign', 
          'utm_term', 'utm_content', 'gclid', 'fbclid', 'click_id', 'subid'
        ];

        paramsToCheck.forEach(param => {
          if (urlParams.has(param)) {
            trackingInfo.push(`${param}=${urlParams.get(param)}`);
          }
        });

        let trackingBlock = '\n\n---\n[System Order Info]';
        trackingBlock += `\n• Click Origin: ${sourceName}`;
        if (planName !== 'None') {
          trackingBlock += `\n• Plan Selected: ${planName}`;
        }

        if (trackingInfo.length > 0) {
          trackingBlock += `\n• Campaign Referrer: ${trackingInfo.join(', ')}`;
        } else {
          trackingBlock += '\n• Traffic Origin: Organic / Direct';
        }

        trackingBlock += `\n• Landing URL: ${window.location.origin}${window.location.pathname}`;

        const baseText = textParam || 'Hello RedStream, I would like to get a premium IPTV subscription.';
        const updatedText = baseText + trackingBlock;

        urlObj.searchParams.set('text', updatedText);
        anchor.setAttribute('href', urlObj.toString());
      } catch (e) {
        console.error('Error in whatsapp tracking', e);
      }
    });

    // Scroll progress bar
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const progressBar = document.getElementById('scroll-progress-bar');
      if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Countdown timer
    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    let targetTime = localStorage.getItem('redstream_promo_end_3days');
    const now = new Date().getTime();

    if (!targetTime || parseInt(targetTime) < now) {
      targetTime = (now + THREE_DAYS_IN_MS).toString();
      localStorage.setItem('redstream_promo_end_3days', targetTime);
    }

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      let timeLeft = parseInt(targetTime!) - currentTime;

      if (timeLeft <= 0) {
        const newEnd = currentTime + THREE_DAYS_IN_MS;
        localStorage.setItem('redstream_promo_end_3days', newEnd.toString());
        targetTime = newEnd.toString();
        timeLeft = THREE_DAYS_IN_MS;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      const dEl = document.getElementById('cd-val-d');
      const hEl = document.getElementById('cd-val-h');
      const mEl = document.getElementById('cd-val-m');
      const sEl = document.getElementById('cd-val-s');
      
      if (dEl) dEl.innerText = days.toString().padStart(2, '0');
      if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
      if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
      if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
    };
    
    updateTimer(); // Prevent initial flash
    const timerInterval = setInterval(updateTimer, 1000);



    // Testimonials slider
    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialsPrevBtn = document.getElementById('testimonials-prev');
    const testimonialsNextBtn = document.getElementById('testimonials-next');
    const testimonialsDotsContainer = document.getElementById('testimonials-dots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const numTestimonialsDots = 4;

    const getVisibleTestimonialsCount = () => {
      const width = window.innerWidth;
      if (width > 1024) return 3;
      if (width > 768) return 2;
      return 1;
    };

    const scrollTestimonials = (direction: 'prev' | 'next') => {
      if (!testimonialsTrack || testimonialCards.length === 0) return;
      const cardWidth = testimonialCards[0].getBoundingClientRect().width;
      const gap = 24;
      const scrollAmount = (cardWidth + gap) * Math.round(getVisibleTestimonialsCount());
      if (direction === 'next') {
        const maxScrollLeft = testimonialsTrack.scrollWidth - testimonialsTrack.clientWidth;
        if (testimonialsTrack.scrollLeft >= maxScrollLeft - 10) {
          testimonialsTrack.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          testimonialsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        testimonialsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    };

    const updateTestimonialsDots = () => {
      if (!testimonialsTrack || !testimonialsDotsContainer) return;
      testimonialsDotsContainer.innerHTML = '';
      const maxScrollLeft = testimonialsTrack.scrollWidth - testimonialsTrack.clientWidth;
      if (maxScrollLeft <= 0) return;
      
      const currentScrollRatio = testimonialsTrack.scrollLeft / maxScrollLeft;
      const activeDotIndex = Math.min(numTestimonialsDots - 1, Math.max(0, Math.round(currentScrollRatio * (numTestimonialsDots - 1))));

      for (let i = 0; i < numTestimonialsDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'testimonial-dot' + (i === activeDotIndex ? ' active' : '');
        dot.addEventListener('click', () => {
          const targetScrollLeft = (i / (numTestimonialsDots - 1)) * maxScrollLeft;
          testimonialsTrack.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
        });
        testimonialsDotsContainer.appendChild(dot);
      }
    };

    const handleTestimonialsPrev = () => scrollTestimonials('prev');
    const handleTestimonialsNext = () => scrollTestimonials('next');

    if (testimonialsPrevBtn && testimonialsNextBtn) {
      testimonialsPrevBtn.addEventListener('click', handleTestimonialsPrev);
      testimonialsNextBtn.addEventListener('click', handleTestimonialsNext);
    }

    if (testimonialsTrack) {
      testimonialsTrack.addEventListener('scroll', updateTestimonialsDots);
      window.addEventListener('resize', updateTestimonialsDots);
      setTimeout(updateTestimonialsDots, 300);
    }

    let autoRotationInterval = setInterval(() => {
      scrollTestimonials('next');
    }, 6000);

    const pauseAutoRotation = () => {
      clearInterval(autoRotationInterval);
    };

    if (testimonialsTrack) {
      testimonialsTrack.addEventListener('touchstart', pauseAutoRotation, { passive: true });
      testimonialsTrack.addEventListener('mousedown', pauseAutoRotation);
    }
    if (testimonialsPrevBtn) testimonialsPrevBtn.addEventListener('click', pauseAutoRotation);
    if (testimonialsNextBtn) testimonialsNextBtn.addEventListener('click', pauseAutoRotation);

    // Showcase slider
    const showcaseTrack = document.getElementById('showcase-track');
    const showcasePrevBtn = document.getElementById('showcase-prev');
    const showcaseNextBtn = document.getElementById('showcase-next');
    const showcaseDotsContainer = document.getElementById('showcase-dots');
    const showcaseSlides = document.querySelectorAll('.showcase-slide');
    const numDots = 8;

    const getVisibleSlidesCount = () => {
      const width = window.innerWidth;
      if (width > 1024) return 4;
      if (width > 768) return 3;
      if (width > 480) return 2;
      return 1.33;
    };

    const scrollSlider = (direction: 'prev' | 'next') => {
      if (!showcaseTrack || showcaseSlides.length === 0) return;
      const slideWidth = showcaseSlides[0].getBoundingClientRect().width;
      const gap = 20;
      const scrollAmount = (slideWidth + gap) * Math.round(getVisibleSlidesCount());
      if (direction === 'next') {
        showcaseTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        showcaseTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    };

    const updateDots = () => {
      if (!showcaseTrack || !showcaseDotsContainer) return;
      showcaseDotsContainer.innerHTML = '';
      const maxScrollLeft = showcaseTrack.scrollWidth - showcaseTrack.clientWidth;
      if (maxScrollLeft <= 0) return;
      
      const currentScrollRatio = showcaseTrack.scrollLeft / maxScrollLeft;
      const activeDotIndex = Math.min(numDots - 1, Math.max(0, Math.round(currentScrollRatio * (numDots - 1))));

      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'showcase-dot' + (i === activeDotIndex ? ' active' : '');
        dot.addEventListener('click', () => {
          const targetScrollLeft = (i / (numDots - 1)) * maxScrollLeft;
          showcaseTrack.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
        });
        showcaseDotsContainer.appendChild(dot);
      }
    };

    const handleShowcasePrev = () => scrollSlider('prev');
    const handleShowcaseNext = () => scrollSlider('next');

    if (showcasePrevBtn && showcaseNextBtn) {
      showcasePrevBtn.addEventListener('click', handleShowcasePrev);
      showcaseNextBtn.addEventListener('click', handleShowcaseNext);
    }

    if (showcaseTrack) {
      showcaseTrack.addEventListener('scroll', updateDots);
      window.addEventListener('resize', updateDots);
      setTimeout(updateDots, 300);
    }

    // Cleanup function
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timerInterval);
                        
      if (testimonialsPrevBtn) testimonialsPrevBtn.removeEventListener('click', handleTestimonialsPrev);
      if (testimonialsNextBtn) testimonialsNextBtn.removeEventListener('click', handleTestimonialsNext);
      if (testimonialsTrack) {
        testimonialsTrack.removeEventListener('scroll', updateTestimonialsDots);
        testimonialsTrack.removeEventListener('touchstart', pauseAutoRotation);
        testimonialsTrack.removeEventListener('mousedown', pauseAutoRotation);
      }
      window.removeEventListener('resize', updateTestimonialsDots);
      clearInterval(autoRotationInterval);
      if (showcasePrevBtn) showcasePrevBtn.removeEventListener('click', handleShowcasePrev);
      if (showcaseNextBtn) showcaseNextBtn.removeEventListener('click', handleShowcaseNext);
      if (showcaseTrack) showcaseTrack.removeEventListener('scroll', updateDots);
      window.removeEventListener('resize', updateDots);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="scroll-progress-bar"></div>

      {/* Semantic Headings for SEO Parsers, Crawlers and Search Robots */}
      <div 
        className="sr-only" 
        style={{ 
          position: 'absolute', 
          width: '1px', 
          height: '1px', 
          padding: 0, 
          margin: '-1px', 
          overflow: 'hidden', 
          clip: 'rect(0, 0, 0, 0)', 
          whiteSpace: 'nowrap', 
          borderWidth: 0 
        }}
      >
        <h1>
          {currentLang === 'ar' 
            ? 'RedStream™ IPTV متميز - أفضل خدمة اشتراك IPTV مستقرة لعام 2026' 
            : currentLang === 'es' 
            ? 'RedStream™ IPTV Premium - El Mejor Servicio de Suscripción IPTV Estable de 2026'
            : currentLang === 'nl'
            ? 'RedStream™ Premium IPTV - Beste Stabiele IPTV-abonnement Service 2026'
            : 'RedStream™ Premium IPTV - Ultimate 4K IPTV Service 2026'}
        </h1>
        <h2 className="text-white">
          {currentLang === 'ar'
            ? 'لماذا RedStream هو المزود الممتاز رقم #1'
            : currentLang === 'es'
            ? 'Por Qué RedStream es el Proveedor Premium N.º 1'
            : currentLang === 'nl'
            ? 'Waarom RedStream de #1 Premium IPTV-aanbieder is'
            : 'Why RedStream is the #1 Premium Provider'}
        </h2>
        <h2 className="text-white">
          {currentLang === 'ar'
            ? 'التحقق من توافق الأجهزة والأنظمة'
            : currentLang === 'es'
            ? 'Verificar Compatibilidad de Dispositivos'
            : currentLang === 'nl'
            ? 'Controleer Apparaatcompatibiliteit'
            : 'Check Device Compatibility'}
        </h2>
        <h2 className="text-white">
          {currentLang === 'ar'
            ? 'اختر باقة RedStream المناسبة لك'
            : currentLang === 'es'
            ? 'Elija Su Plan de RedStream Premium'
            : currentLang === 'nl'
            ? 'Kies Uw RedStream Premium Plan'
            : 'Choose Your RedStream Plan'}
        </h2>
        <h2 className="text-white">
          {currentLang === 'ar'
            ? 'ماذا يقول أعضاؤنا المميزون'
            : currentLang === 'es'
            ? 'Lo Que Dicen Nuestros Miembros Premium'
            : currentLang === 'nl'
            ? 'Wat Onze Premium Leden Zeggen'
            : 'What Our Premium Members Say'}
        </h2>
        <h2 className="text-white">
          {currentLang === 'ar'
            ? 'الأسئلة الشائعة والاستفسارات'
            : currentLang === 'es'
            ? 'Preguntas Frecuentes'
            : currentLang === 'nl'
            ? 'Veelgestelde Vragen'
            : 'Frequently Asked Questions'}
        </h2>
      </div>

      {/* Navigation Header */}
      <header>
        <div className="container nav-container">
          <a href="#" className="logo" id="logo-anchor" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: "smooth"}); }}>
            {/* Modern Premium RedStream Logo SVG */}
            <svg className="custom-logo-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{ width: '28px', height: '28px', filter: 'drop-shadow(0 0 5px var(--color-primary-glow))' }}>
              <g transform="translate(16, 16) scale(0.93)">
                <path d="M 120 140 L 340 140 A 75 75 0 0 1 415 215 A 75 75 0 0 1 340 290 L 280 290 L 400 380 L 330 380 L 225 300 L 150 380 L 105 380 L 205 300 L 245 250 L 340 250 A 35 35 0 0 0 375 215 A 35 35 0 0 0 340 180 L 160 180 Z" fill="#FF1E27" />
                <polygon points="120,200 200,245 120,290" fill="#FFFFFF" />
              </g>
            </svg>
            Red<span>Stream</span>
          </a>

          {/* Desktop Nav links */}
          <nav style={{ display: 'flex', alignItems: 'center' }}>
            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu">
              <li><a href="#" id="link-home" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.scrollTo({top: 0, behavior: "smooth"}); }}>{navTranslations[currentLang].home}</a></li>
              <li><a href="#features" id="link-features" onClick={() => setIsMobileMenuOpen(false)}>{navTranslations[currentLang].features}</a></li>
              <li><a href="#pricing" id="link-pricing" onClick={() => setIsMobileMenuOpen(false)}>{navTranslations[currentLang].pricing}</a></li>
              <li><a href="#faq" id="link-faq" onClick={() => setIsMobileMenuOpen(false)}>{navTranslations[currentLang].faq}</a></li>
              <li><a href={`/${currentLang}/blog`} id="link-blog" style={{ color: '#FF1E27', fontWeight: 800 }} onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); if(onNavigate) onNavigate(`/${currentLang}/blog`); }}>{navTranslations[currentLang].blog}</a></li>
            </ul>
            <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20want%20to%20get%20a%20free%20IPTV%20trial." target="_blank" rel="noopener noreferrer" className="nav-cta" id="nav-cta-trial">{navTranslations[currentLang].cta}</a>
            
            {/* Elegant Language Switcher inside header */}
            <div className="lang-switcher-wrapper" style={{ position: 'relative', display: 'inline-block', marginLeft: '12px' }}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(10, 10, 10, 0.5)', backdropFilter: 'blur(10px)', color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Globe size={14} style={{ color: '#9ca3af' }} />
                <span style={{ fontWeight: 800 }}>{currentLang.toUpperCase()}</span>
                <ChevronDown size={12} style={{ color: '#9ca3af', transform: langDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {langDropdownOpen && (
                <>
                  <div 
                    style={{ position: 'fixed', inset: 0, zIndex: 999 }} 
                    onClick={() => setLangDropdownOpen(false)} 
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      marginTop: '8px',
                      width: '140px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(20, 20, 20, 0.8)', backdropFilter: 'blur(15px)', padding: '6px', boxShadow: '0 10px 35px rgba(0, 0, 0, 0.9), 0 0 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)',
                      zIndex: 1000,
                    }}
                  >
                    {Object.entries(languageNames).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => {
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
                          transition: 'background-color 0.2s, color 0.2s',
                        }}
                      >
                        <span style={{ fontSize: '14px' }}>{value.flag}</span>
                        <span>{value.native}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button 
              className="menu-toggle" 
              id="mobile-menu-btn" 
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ marginLeft: '12px' }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section & Rest of Landing Page Content */}
      <div dangerouslySetInnerHTML={{ __html: getTranslatedLandingHTML(LANDING_HTML_TOP, currentLang) }} />
      <DownloaderCodes />

      {/* Sleek dynamic FAQ Accordion Component */}
      <FAQSection currentLang={currentLang} />

      {/* Footer and Bottom Floating Widgets */}
      <div dangerouslySetInnerHTML={{ __html: getTranslatedLandingHTML(LANDING_HTML_BOTTOM, currentLang).replace('href="/privacy.html"', `href="/privacy.html"`) }} />
    </>
  );
}

const LANDING_HTML_TOP = `
  <!-- Hero Section -->
  <section class="hero container py-16 md:py-24" id="hero-section">
    <div class="badge" id="hero-badge">
      <span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="4"/>
        </svg>
      </span>
      Premium 4K IPTV Service 2026
    </div>
    
    <h1 id="hero-title">
      <span>Experience Ultimate TV with</span><br>
      <span class="highlight">RedStream™ Premium IPTV</span>
    </h1>
    
    <p id="hero-subheading">
      Stream over 20,000+ live premium TV channels and 60,000+ blockbuster movies & VOD in stunning Ultra HD 4K. Zero freezing, smart loading, and instant instant activation.
    </p>

    <!-- Conversion Countdown Timer -->
    <div class="countdown-timer-container" id="countdown-timer-box">
      <span class="countdown-timer-title text-gray-400 font-medium text-sm mb-2" style="text-transform: none; letter-spacing: normal; color: #a3a3a3;">Limited time offer ends in:</span>
      <div class="countdown-timer" dir="ltr">
        <div class="countdown-unit">
          <span class="countdown-number" id="cd-val-d">00</span>
          <span class="countdown-label">days</span>
        </div>
        <span class="countdown-separator">:</span>
        <div class="countdown-unit">
          <span class="countdown-number" id="cd-val-h">00</span>
          <span class="countdown-label">hours</span>
        </div>
        <span class="countdown-separator">:</span>
        <div class="countdown-unit">
          <span class="countdown-number" id="cd-val-m">00</span>
          <span class="countdown-label">mins</span>
        </div>
        <span class="countdown-separator">:</span>
        <div class="countdown-unit">
          <span class="countdown-number" id="cd-val-s">00</span>
          <span class="countdown-label">secs</span>
        </div>
      </div>
    </div>

    <!-- CTA Actions Container -->
    <div class="flex flex-col items-center gap-5 w-full">
      <!-- WhatsApp CTA -->
      <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20would%20like%20to%20activate%20a%20premium%20IPTV%20subscription." target="_blank" rel="noopener noreferrer" class="group flex items-center justify-center gap-3 bg-[#e50914] hover:bg-[#b80710] text-white text-base sm:text-lg font-bold py-4 px-8 rounded-xl w-full max-w-sm mx-auto transition-all duration-300 transform hover:-translate-y-1 shadow-[0_8px_20px_rgba(229,9,20,0.25)] hover:shadow-[0_12px_25px_rgba(229,9,20,0.4)]" id="hero-main-cta">
        <!-- WhatsApp Icon -->
        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span>Get Started on WhatsApp</span>
      </a>
      
      <!-- Secondary CTA -->
      <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20would%20like%20to%20request%20my%202-Hour%20Free%20Trial." target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors text-sm font-medium underline underline-offset-4 decoration-gray-600 hover:decoration-white" id="hero-secondary-cta">
        Or request a 2-Hour Free Trial
      </a>
    </div>

    <!-- Sleek Trust Signals -->
    <div class="flex flex-col items-center gap-4 mt-8 opacity-70">
      <!-- Minimalist Features -->
      <div class="flex flex-wrap justify-center gap-4 text-xs font-medium tracking-wide text-gray-400 uppercase">
        <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-[#e50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Instant Setup</span>
        <span class="hidden sm:inline text-gray-600">•</span>
        <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-[#e50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> 99.9% Uptime</span>
        <span class="hidden sm:inline text-gray-600">•</span>
        <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-[#e50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg> 24/7 Support</span>
      </div>

      <!-- Payment Icons (Tiny & Clean) -->
      <div class="flex items-center gap-3 grayscale opacity-60">
        <svg style="height: 16px;" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-1.1.6-2.1.6-1.1 0-2.5-.2-3.1-.5zm5.4-5.3c-.3 0-.6.3-.7.6l-1.6 6.1c0 .1-.1.1-.2.1h-2.6c-.1 0-.2 0-.2-.2l2.7-8.7c0-.2.3-.3.5-.3h2.6c.1 0 .2.2.2.2l-1 2.2zm-7.6 6.4h-2.6c-.1 0-.2 0-.2-.2L7.3 8.3c0-.1-.1-.1-.2-.2-.2-.1-.7-.3-1.5-.5L5.7 7c.8-.1 1.6-.2 2.3-.2.3 0 .4.1.5.3l1.8 7.3z" fill="#1434CB"></path></svg>
        <svg style="height: 16px;" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.2-3 3.3-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
        <svg style="height: 16px;" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.4-1.6-.7-3.1-.7h-4.7c-.1 0-.2.1-.2.2l-2.7 17.3c0 .1.1.2.2.2h3.2c.1 0 .2-.1.2-.2l1.3-8.2c0-.1.1-.2.2-.2h1.5c4.6 0 6.9-2.3 4.7-6.1z"></path><path fill="#3086C8" d="M23.9 8.3c-1.1 5.4-4.8 6.1-8 6.1H15c-.1 0-.2.1-.2.2l-1.3 8.2c0 .1.1.2.2.2h3.2c.1 0 .2-.1.2-.2l.9-5.9c0-.1.1-.2.2-.2h1.5c3.8 0 6.3-1.6 7-4.6 1-4.1-1.6-4.5-2.8-4.2z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2.1-.2.2l-2.7 17.3c0 .1.1.2.2.2h3.2c.1 0 .2-.1.2-.2l.6-4c0-.1.1-.2.2-.2h1.5c3.2 0 5.4-1.3 6-3.8.7-3 .2-5.4-1.4-6.8-.7-.6-1.5-1.1-2.9-1.3z"></path></svg>
      </div>
    </div>
  </section>

  <!-- Live Stats (Moved outside hero, minimalist design) -->
  <section class="border-y border-gray-800/50 bg-black/50 py-8">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800/50">
        <div class="flex flex-col items-center pt-4 md:pt-0">
          <span class="text-3xl font-bold text-white tracking-tight mb-1">15,000+</span>
          <span class="text-sm text-gray-400 font-medium uppercase tracking-wider">Happy Clients</span>
        </div>
        <div class="flex flex-col items-center pt-4 md:pt-0">
          <span class="text-3xl font-bold text-[#e50914] tracking-tight mb-1">99.9%</span>
          <span class="text-sm text-gray-400 font-medium uppercase tracking-wider">Server Uptime</span>
        </div>
        <div class="flex flex-col items-center pt-4 md:pt-0">
          <span class="text-3xl font-bold text-white tracking-tight mb-1">4.9 / 5</span>
          <span class="text-sm text-gray-400 font-medium uppercase tracking-wider">Google Rating</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section --><!-- Features Section -->
  <section class="features py-16 md:py-24" id="features">
    <div class="container">
      <div class="section-header">
        <h2 class="text-white">Why RedStream is the #1 Premium Provider</h2>
        <p>We invest in top-tier bare-metal hardware and proprietary caching algorithms to bring you zero lag and crisp imagery.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Benefit 1 -->
        <div class="bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#e50914]/40 hover:shadow-[0_15px_30px_rgba(229,9,20,0.1)] group">
          <div class="w-14 h-14 bg-[#e50914] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#e50914]/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg uppercase tracking-wide mb-3">Anti-Freeze 9.0</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Intelligent load-balancing and direct peering with major ISPs guarantees stream stability even during major events.</p>
        </div>

        <!-- Benefit 2 -->
        <div class="bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#e50914]/40 hover:shadow-[0_15px_30px_rgba(229,9,20,0.1)] group">
          <div class="w-14 h-14 bg-[#e50914] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#e50914]/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M12 2V22M17 5H9.5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8H14.5C15.3284 8 16 8.67157 16 9.5C16 10.3284 15.3284 11 14.5 11H8M12 11V14M16 14H10C9.17157 14 8.5 14.6716 8.5 15.5C8.5 16.3284 9.17157 17 10 17H14C14.8284 17 15.5 17.6716 15.5 18.5C15.5 19.3284 14.8284 20 14 20H8"/>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg uppercase tracking-wide mb-3">10-Min Setup</h3>
          <p class="text-gray-400 text-sm leading-relaxed">No waiting games. Purchase your subscription and receive your personalized login via WhatsApp in minutes.</p>
        </div>

        <!-- Benefit 3 -->
        <div class="bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#e50914]/40 hover:shadow-[0_15px_30px_rgba(229,9,20,0.1)] group">
          <div class="w-14 h-14 bg-[#e50914] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#e50914]/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="2" y1="7" x2="7" y2="7"/>
              <line x1="2" y1="17" x2="7" y2="17"/>
              <line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg uppercase tracking-wide mb-3">20K Live & 60K VOD</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Full sports catalogs, local channels, premium cinema, and the hottest streaming releases in one place.</p>
        </div>

        <!-- Benefit 4 -->
        <div class="bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#e50914]/40 hover:shadow-[0_15px_30px_rgba(229,9,20,0.1)] group">
          <div class="w-14 h-14 bg-[#e50914] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#e50914]/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg uppercase tracking-wide mb-3">24/7 WhatsApp</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Real human engineers ready to help you with activation, device troubleshooting, and setup anytime.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Device Compatibility Logos Section -->
  <section class="compatibility py-16 md:py-24" id="compatibility">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
      <div style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h2 style="font-family: var(--font-sans, sans-serif); font-weight: 800; font-size: 1.8rem; color: #ffffff; text-transform: uppercase; letter-spacing: -0.02em; margin-bottom: 15px;" class="text-white">Supported Devices</h2>
        <p style="color: #aaaaaa; font-size: 1rem; line-height: 1.6; margin-bottom: 40px;">RedStream™ is fully optimized and 100% compatible with all your favorite smart devices and streaming boxes. Setup takes less than 5 minutes.</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
          <!-- Smart TV -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center relative z-10">Smart TV</span>
          </div>
          <!-- Android -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center relative z-10">Android / iOS</span>
          </div>
          <!-- Apple TV -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center relative z-10">Apple TV</span>
          </div>
          <!-- Firestick -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center relative z-10">Firestick</span>
          </div>
          <!-- MAG Box -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center leading-tight relative z-10">MAG / Formuler</span>
          </div>
          <!-- PC / Web -->
          <div class="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914] hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[#e50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-10 h-10 text-gray-400 group-hover:text-[#e50914] transition-colors duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span class="text-gray-300 group-hover:text-white font-semibold text-[13px] uppercase tracking-wider font-sans text-center leading-tight relative z-10">PC / Web Player</span>
          </div>
        </div>
      </div>
    </section>

  <!-- Pricing Table Section -->
  <section class="pricing py-16 md:py-24" id="pricing">
    <div class="container">
      <div class="section-header">
        <h2 class="text-white">Choose Your RedStream Plan</h2>
        <p>No hidden fees. Select the subscription period that suits you and start watching instantly via secure WhatsApp order activation.</p>
      </div>

      
            <!-- How it Works Section -->
      <div class="flex flex-row items-start justify-between w-full max-w-xl mx-auto relative px-4" style="font-family: var(--font-sans); margin-top: 40px; margin-bottom: 70px;">
        
        <!-- Connecting Line Background -->
        <div class="absolute top-[20px] md:top-[24px] left-[15%] right-[15%] h-[2px] bg-gray-700 z-0 hidden sm:block"></div>
        
        <div class="flex flex-col items-center text-center flex-1 relative z-10 px-1">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-3 shadow-lg text-sm md:text-base transition-transform hover:scale-110 relative border-4 border-[#0a0a0a]">1</div>
          <span class="text-gray-300 font-medium text-xs sm:text-sm uppercase tracking-wider leading-tight">Choose<br class="sm:hidden"/> a Plan</span>
        </div>
        
        <div class="flex flex-col items-center text-center flex-1 relative z-10 px-1">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mb-3 shadow-lg text-sm md:text-base transition-transform hover:scale-110 relative border-4 border-[#0a0a0a]">2</div>
          <span class="text-gray-300 font-medium text-xs sm:text-sm uppercase tracking-wider leading-tight">Get via<br class="sm:hidden"/> WhatsApp</span>
        </div>
        
        <div class="flex flex-col items-center text-center flex-1 relative z-10 px-1">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#e50914] flex items-center justify-center text-white font-bold mb-3 shadow-[0_0_15px_rgba(229,9,20,0.5)] text-sm md:text-base transition-transform hover:scale-110 relative border-4 border-[#0a0a0a]">3</div>
          <span class="text-white font-bold text-xs sm:text-sm uppercase tracking-wider leading-tight">Start<br class="sm:hidden"/> Watching</span>
        </div>
        
      </div>
      <div class="flex flex-wrap justify-center gap-8 md:gap-6 lg:gap-8 mt-10 max-w-5xl mx-auto">
        <!-- Plan 1: 1 Month -->
        <div class="pricing-card w-full sm:w-[calc(50%-16px)] md:w-[calc(50%-20px)] lg:w-[calc(33.333%-20px)] max-w-[380px] flex flex-col border border-gray-800 bg-gradient-to-b from-gray-900 to-black shadow-lg rounded-xl relative" id="plan-1month">
          <div class="plan-header">
            <h3 class="plan-name">1 Month</h3>
            <div class="plan-price-wrapper">
              <span class="plan-price">12.00</span>
              <span class="plan-currency">€</span>
              <span class="plan-duration">/Month</span>
            </div>
            <p class="plan-desc text-gray-400 font-normal normal-case not-italic">Flexible month-by-month premium access. Cancel anytime.</p>
          </div>
          <div class="plan-divider"></div>
          <ul class="plan-features">
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 20,000+ Live Channels</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 60,000+ VOD Movies</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 4K / Ultra HD Quality</li>
          </ul>
          <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20want%20to%20order%20the%201%20Month%20Plan%20for%2012%E2%82%AC." target="_blank" rel="noopener noreferrer" class="plan-cta mt-auto bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition-colors" id="btn-1month-order">Order 1 Month</a>
        </div>

        <!-- Plan 3: 12 Months (Pulsing Red Neon Highlighted - Best Value) -->
        <div class="pricing-card popular w-full sm:w-[calc(50%-16px)] md:w-[calc(50%-20px)] lg:w-[calc(33.333%-20px)] max-w-[380px] flex flex-col bg-gradient-to-b from-gray-900 to-black z-10 border border-[#e50914]/50 shadow-[0_10px_30px_rgba(229,9,20,0.2)] relative" id="plan-12months">
          <div class="pricing-tag" style="background: #e50914; color: white; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: max-content; box-shadow: 0 0 15px rgba(229,9,20,0.5);">Launch Offer</div>
          <div class="plan-header">
            <h3 class="plan-name">12 Months</h3>
            <div class="flex flex-col items-center justify-center mt-4 mb-2">
              <span class="text-gray-500 line-through text-lg font-medium mb-1">79.00 €</span>
              <div class="flex items-baseline text-[#e50914]">
                <span class="plan-price text-[#e50914]">49.00</span>
                <span class="plan-currency text-[#e50914]">€</span>
                <span class="plan-duration text-gray-400">/Year</span>
              </div>
            </div>
            <div class="text-[11px] text-[#e50914]/80 font-medium tracking-wide uppercase mb-3">Equals 4.08€ / mo</div>
            <p class="plan-desc text-gray-400 font-normal normal-case not-italic">Ultimate premium package. Only 10€ more than 6 months!</p>
          </div>
          <div class="plan-divider"></div>
          <ul class="plan-features">
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 20,000+ Live Channels</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 60,000+ VOD Movies</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 4K / Ultra HD Quality</li>
            <li class="premium-feature"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Anti-Freeze Stable Server</li>
            <li class="premium-feature"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 24/7 VIP Customer Support</li>
          </ul>
          <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20want%20to%20order%20the%2012%20Months%20Premium%20Plan%20for%2049%E2%82%AC." target="_blank" rel="noopener noreferrer" class="plan-cta mt-auto bg-[#e50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:shadow-[0_0_30px_rgba(229,9,20,0.8)] transition-shadow" id="btn-12months-order">Order 12 Months</a>
        <!-- Plan 2: 6 Months (Decoy) -->
        <div class="pricing-card w-full sm:w-[calc(50%-16px)] md:w-[calc(50%-20px)] lg:w-[calc(33.333%-20px)] max-w-[380px] flex flex-col border border-gray-800 bg-gradient-to-b from-gray-900 to-black shadow-lg rounded-xl relative" id="plan-6months">
          <div class="plan-header">
            <h3 class="plan-name">6 Months</h3>
            <div class="plan-price-wrapper" style="margin-bottom: 4px;">
              <span class="plan-price">39.00</span>
              <span class="plan-currency">€</span>
              <span class="plan-duration">/6 Months</span>
            </div>
            <div class="text-[11px] text-gray-400/80 font-medium tracking-wide uppercase mb-3">Equals 6.50€ / mo</div>
            <p class="plan-desc text-gray-400 font-normal normal-case not-italic">Our highly popular plan. Ideal for keeping up with sports season.</p>
          </div>
          <div class="plan-divider"></div>
          <ul class="plan-features">
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 20,000+ Live Channels</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 60,000+ VOD Movies</li>
            <li><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 4K / Ultra HD Quality</li>
            <li class="premium-feature"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Anti-Freeze Stable Server</li>
          </ul>
          <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20want%20to%20order%20the%206%20Months%20Plan%20for%2039%E2%82%AC." target="_blank" rel="noopener noreferrer" class="plan-cta mt-auto bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition-colors" id="btn-6months-order">Order 6 Months</a>
        </div>

        </div>
      </div>

      
      
      <div class="pricing-trust-signals" style="display: flex; justify-content: center; gap: 40px; margin-top: 60px; flex-wrap: wrap; text-align: center; color: #888; font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.05em;">
        <div style="display: flex; align-items: center; gap: 10px; opacity: 0.7;">
          <svg style="width: 18px; height: 18px; color: #aaa;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          <span>Anti-Freeze Technology</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; opacity: 0.7;">
          <svg style="width: 18px; height: 18px; color: #aaa;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <span>99.9% Uptime Server</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; opacity: 0.7;">
          <svg style="width: 18px; height: 18px; color: #aaa;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>


            <!-- Testimonial 2 -->
            <div class="testimonial-card">
              <span class="testimonial-quote-icon">“</span>
              <div class="testimonial-header">
                <div class="testimonial-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <p class="testimonial-content">
                "RedStream is by far the best IPTV provider. The premium anti-freeze technology works flawlessly. High-quality channels, amazing support, and the VOD library is updated weekly. Highly recommend!"
              </p>
              <div class="testimonial-author-info">
                <div class="testimonial-avatar">T</div>
                <div class="testimonial-meta">
                  <span class="testimonial-name">Thomas <span class="testimonial-badge-verified">Verified</span></span>
                  <span class="testimonial-location">France</span>
                </div>
              </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="testimonial-card">
              <span class="testimonial-quote-icon">“</span>
              <div class="testimonial-header">
                <div class="testimonial-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <p class="testimonial-content">
                "Incredible service! Setup on my Smart TV took less than 10 minutes through WhatsApp support. Stable streams for sports and local channels are very reliable. The customer service is truly 24/7 VIP."
              </p>
              <div class="testimonial-author-info">
                <div class="testimonial-avatar">A</div>
                <div class="testimonial-meta">
                  <span class="testimonial-name">Anass <span class="testimonial-badge-verified">Verified</span></span>
                  <span class="testimonial-location">Morocco</span>
                </div>
              </div>
            </div>

            <!-- Testimonial 4 -->
            <div class="testimonial-card">
              <span class="testimonial-quote-icon">“</span>
              <div class="testimonial-header">
                <div class="testimonial-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <p class="testimonial-content">
                "I was skeptical at first, but after testing the trial, I bought the 12-month plan. No freeze during live matches, and crisp 4K picture quality. Activation is fast and the interface is very easy to use."
              </p>
              <div class="testimonial-author-info">
                <div class="testimonial-avatar">S</div>
                <div class="testimonial-meta">
                  <span class="testimonial-name">Sarah <span class="testimonial-badge-verified">Verified</span></span>
                  <span class="testimonial-location">Canada</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Pagination Dots -->
        <div class="testimonials-dots-container" id="testimonials-dots"></div>
      </div>
    </div>
  </section>

  <!-- Trending Entertainment Showcase Section -->
  <section class="showcase-section py-16 md:py-24" id="showcase-section">
    <div class="container">
      <div class="section-header">
        <h2 class="text-white">Trending Entertainment Showcase</h2>
        <p>Explore a taste of our massive library, including blockbuster movies, popular TV shows, and premium live broadcasts, all streamable on any device.</p>
      </div>

      <div class="showcase-slider-wrapper">
        <!-- Navigation Arrows -->
        <button class="showcase-arrow prev" id="showcase-prev" aria-label="Previous Slide">◀</button>
        <button class="showcase-arrow next" id="showcase-next" aria-label="Next Slide">▶</button>

        <div class="showcase-slider-container">
          <div class="showcase-track" id="showcase-track">
            <!-- 1. Past Lives -->
            <div class="showcase-slide">
              <span class="showcase-badge">TOP RATED</span>
              <img src="/1000148213-iptv-france.webp" alt="Stream Past Lives on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Past Lives</h3>
                <div class="showcase-info">
                  <span>Romance / Drama</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 2. Road House -->
            <div class="showcase-slide">
              <span class="showcase-badge">ACTION HIT</span>
              <img src="/1000148217-iptv-france.webp" alt="Stream Road House on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Road House</h3>
                <div class="showcase-info">
                  <span>Action / Thriller</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 3. Saltburn -->
            <div class="showcase-slide">
              <span class="showcase-badge">MUST WATCH</span>
              <img src="/1000148233-iptv-france.webp" alt="Stream Saltburn on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Saltburn</h3>
                <div class="showcase-info">
                  <span>Thriller / Drama</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 4. Killers of the Flower Moon -->
            <div class="showcase-slide">
              <span class="showcase-badge">OSCAR NOMINEE</span>
              <img src="/1000148230-iptv-france.webp" alt="Stream Killers of the Flower Moon on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Killers of the Flower Moon</h3>
                <div class="showcase-info">
                  <span>Crime / Drama</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 5. Inception -->
            <div class="showcase-slide">
              <span class="showcase-badge">CLASSIC</span>
              <img src="/1000148232-iptv-france.webp" alt="Stream Inception on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Inception</h3>
                <div class="showcase-info">
                  <span>Sci-Fi / Action</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 6. Shogun -->
            <div class="showcase-slide">
              <span class="showcase-badge">CRITICS CHOICE</span>
              <img src="/1000148219-iptv-france.webp" alt="Stream Shogun on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Shogun</h3>
                <div class="showcase-info">
                  <span>History / Drama</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 7. Poor Things -->
            <div class="showcase-slide">
              <span class="showcase-badge">AWARD WINNER</span>
              <img src="/1000148223-iptv-france.webp" alt="Stream Poor Things on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Poor Things</h3>
                <div class="showcase-info">
                  <span>Sci-Fi / Comedy</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 8. 3 Body Problem -->
            <div class="showcase-slide">
              <span class="showcase-badge">SCI-FI EPIC</span>
              <img src="/1000148222-iptv-france.webp" alt="Stream 3 Body Problem on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">3 Body Problem</h3>
                <div class="showcase-info">
                  <span>Sci-Fi / Mystery</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 9. Breaking Bad -->
            <div class="showcase-slide">
              <span class="showcase-badge">ALL-TIME BEST</span>
              <img src="/1000148214-iptv-france.webp" alt="Stream Breaking Bad on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Breaking Bad</h3>
                <div class="showcase-info">
                  <span>Crime / Thriller</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 10. Ghostbusters: Frozen Empire -->
            <div class="showcase-slide">
              <span class="showcase-badge">FAMILY HIT</span>
              <img src="/1000148218-iptv-france.webp" alt="Stream Ghostbusters: Frozen Empire on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Ghostbusters: Frozen Empire</h3>
                <div class="showcase-info">
                  <span>Comedy / Fantasy</span>
                  <span class="showcase-quality">1080p</span>
                </div>
              </div>
            </div>

            <!-- 11. The Holdovers -->
            <div class="showcase-slide">
              <span class="showcase-badge">COMEDY HIT</span>
              <img src="/1000148228-iptv-france.webp" alt="Stream The Holdovers on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">The Holdovers</h3>
                <div class="showcase-info">
                  <span>Comedy / Drama</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 12. La Sociedad de la Nieve -->
            <div class="showcase-slide">
              <span class="showcase-badge">TOP STREAM</span>
              <img src="/1000148231-iptv-france.webp" alt="Stream La Sociedad de la Nieve on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">La Sociedad de la Nieve</h3>
                <div class="showcase-info">
                  <span>Survival / Adventure</span>
                  <span class="showcase-quality">1080p</span>
                </div>
              </div>
            </div>

            <!-- 13. Masters of the Air -->
            <div class="showcase-slide">
              <span class="showcase-badge">FULL SERIES</span>
              <img src="/1000148225-iptv-france.webp" alt="Stream Masters of the Air on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Masters of the Air</h3>
                <div class="showcase-info">
                  <span>War / History</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 14. Shaitaan -->
            <div class="showcase-slide">
              <span class="showcase-badge">TRENDING</span>
              <img src="/1000148226-iptv-france.webp" alt="Stream Shaitaan on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Shaitaan</h3>
                <div class="showcase-info">
                  <span>Horror / Thriller</span>
                  <span class="showcase-quality">1080p</span>
                </div>
              </div>
            </div>

            <!-- 15. 20 Days in Mariupol -->
            <div class="showcase-slide">
              <span class="showcase-badge">DOCUMENTARY</span>
              <img src="/1000148229-iptv-france.webp" alt="Stream 20 Days in Mariupol on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">20 Days in Mariupol</h3>
                <div class="showcase-info">
                  <span>Documentary</span>
                  <span class="showcase-quality">1080p</span>
                </div>
              </div>
            </div>

            <!-- 16. Avatar: The Last Airbender -->
            <div class="showcase-slide">
              <span class="showcase-badge">NETFLIX HIT</span>
              <img src="/1000148227-iptv-france.webp" alt="Stream Avatar: The Last Airbender on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">The Last Airbender</h3>
                <div class="showcase-info">
                  <span>Action / Fantasy</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 17. Succession -->
            <div class="showcase-slide">
              <span class="showcase-badge">HBO ORIGINAL</span>
              <img src="/1000148216-iptv-france.webp" alt="Stream Succession on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Succession</h3>
                <div class="showcase-info">
                  <span>Drama / Corporate</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 18. The Last of Us -->
            <div class="showcase-slide">
              <span class="showcase-badge">POPULAR</span>
              <img src="/1000148215-iptv-france.webp" alt="Stream The Last of Us on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">The Last of Us</h3>
                <div class="showcase-info">
                  <span>Sci-Fi / Drama</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 19. The Bear -->
            <div class="showcase-slide">
              <span class="showcase-badge">CRITICS CHOICE</span>
              <img src="/1000148224-iptv-france.webp" alt="Stream The Bear on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">The Bear</h3>
                <div class="showcase-info">
                  <span>Comedy / Drama</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 20. Severance -->
            <div class="showcase-slide">
              <span class="showcase-badge">MIND-BENDING</span>
              <img src="/1000148220-iptv-france.webp" alt="Stream Severance on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Severance</h3>
                <div class="showcase-info">
                  <span>Sci-Fi / Mystery</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 21. Damsel -->
            <div class="showcase-slide">
              <span class="showcase-badge">FANTASY HIT</span>
              <img src="/1000148216-iptv-france.webp" alt="Stream Damsel on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Damsel</h3>
                <div class="showcase-info">
                  <span>Fantasy / Adventure</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 22. The Gentlemen -->
            <div class="showcase-slide">
              <span class="showcase-badge">GUY RITCHIE</span>
              <img src="/1000148221-iptv-france.webp" alt="Stream The Gentlemen on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">The Gentlemen</h3>
                <div class="showcase-info">
                  <span>Action / Comedy</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 23. The Shawshank Redemption -->
            <div class="showcase-slide">
              <span class="showcase-badge">IMDb #1</span>
              <img src="/1000148211-iptv-france.webp" alt="Stream The Shawshank Redemption on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">The Shawshank Redemption</h3>
                <div class="showcase-info">
                  <span>Drama / Classic</span>
                  <span class="showcase-quality">1080p</span>
                </div>
              </div>
            </div>

            <!-- 24. Fight Club -->
            <div class="showcase-slide">
              <span class="showcase-badge">CULT CLASSIC</span>
              <img src="/1000148209-iptv-france.webp" alt="Stream Fight Club on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Fight Club</h3>
                <div class="showcase-info">
                  <span>Drama / Thriller</span>
                  <span class="showcase-quality">1080p</span>
                </div>
              </div>
            </div>

            <!-- 25. Joker -->
            <div class="showcase-slide">
              <span class="showcase-badge">MASTERPIECE</span>
              <img src="/1000148212-iptv-france.webp" alt="Stream Joker on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">Joker</h3>
                <div class="showcase-info">
                  <span>Drama / Crime</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>

            <!-- 26. The Dark Knight -->
            <div class="showcase-slide">
              <span class="showcase-badge">BEST HERO</span>
              <img src="/1000148210-iptv-france.webp" alt="Stream The Dark Knight on IPTV France - Premium Cinema Streaming" loading="lazy">
              <div class="showcase-overlay">
                <h3 class="showcase-title">The Dark Knight</h3>
                <div class="showcase-info">
                  <span>Action / Crime</span>
                  <span class="showcase-quality">4K UHD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Dots -->
        <div class="showcase-dots-container" id="showcase-dots"></div>
      </div>
    </div>
  </section>
`;

const LANDING_HTML_BOTTOM = `
  <!-- Payments & Brand Footer -->
  <footer class="payments-footer">
    <div class="container payments-container">
      
      <div class="payment-title">Guaranteed Safe & Trusted Checkout</div>
      
      <!-- Payments Grid with beautifully customized vector SVGs -->
      <div class="payment-methods-grid" id="payment-badge-container">
        <!-- PayPal Badge -->
        <div class="payment-badge" id="payment-paypal">
          <svg class="badge-paypal" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.076 21.337L9.57 5.518c.09-.571.583-.984 1.161-.984h6.052c2.81 0 4.192 1.348 3.864 3.424-.413 2.61-2.023 4.167-4.475 4.167h-2.148l-.946 5.992c-.042.27-.275.465-.548.465H9.563c-.116 0-.214-.075-.246-.187L7.076 21.337z"/>
            <path opacity="0.6" d="M4.076 18.337L6.57 2.518c.09-.571.583-.984 1.161-.984h6.052c2.81 0 4.192 1.348 3.864 3.424-.413 2.61-2.023 4.167-4.475 4.167h-2.148l-.946 5.992c-.042.27-.275.465-.548.465H6.563c-.116 0-.214-.075-.246-.187L4.076 18.337z"/>
          </svg>
          <span>PayPal</span>
        </div>

        <!-- Stripe Badge -->
        <div class="payment-badge" id="payment-stripe">
          <svg class="badge-stripe" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.93 10.12c0-.62-.51-1.01-1.39-1.01-.81 0-1.63.26-2.41.68l-.45-2.27c.89-.39 2.05-.68 3.26-.68 2.37 0 3.73 1.16 3.73 3.19v5.27c0 .99.19 1.63.45 2.07h-2.61c-.13-.26-.26-.64-.32-.99-.68.68-1.71 1.13-2.87 1.13-1.89 0-3.15-1.06-3.15-2.73 0-2.31 2.37-3.19 5.31-3.19v-.47zm-2.41 3.51c0 .54.41.87.97.87.75 0 1.44-.45 1.44-1.25V12.1h-.97c-1.02 0-1.44.4-1.44 1.12z"/>
          </svg>
          <span>Stripe</span>
        </div>

        <!-- Crypto Badge -->
        <div class="payment-badge" id="payment-crypto">
          <svg class="badge-crypto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.6 12.5c-.7-2.6-2.4-4.5-4.9-5.3l1.1-4.2-2.5-.6-1 4.1c-.7-.2-1.3-.3-2-.5l1.1-4.2-2.5-.6-1.1 4.2c-.5-.1-1.1-.2-1.6-.4l-3.5-.9-.7 2.7s1.9.4 1.8.5c1 .3 1.2 1 1.2 1.5l-1.2 4.9c.1 0 .2.1.3.1-.1 0-.2-.1-.3-.1l-1.7 6.8c-.1.3-.4.8-1.1.6 0 0-1.8-.4-1.8-.4l-1.3 3 3.3.8c.6.2 1.2.3 1.8.5l-1.1 4.3 2.5.6 1.1-4.2c.7.2 1.3.3 1.9.5l-1.1 4.2 2.5.6 1.1-4.2c4.3.8 7.5-.1 8.5-3.4.8-2.6-.1-4.2-2-5.1 1.3-.4 2.3-1.4 2.6-3.4zm-4.7 7.4c-.8 3.1-4.2 1.4-5.4 1.1l1.1-4.5c1.2.3 5.1.8 4.3 3.4zm1-6.9c-.7 2.8-3.5 1.4-4.5 1.1l1-4.1c1 .3 4.2.8 3.5 3zm0 0"/>
          </svg>
          <span>Crypto (BTC/USDT)</span>
        </div>

        <!-- Western Union Badge -->
        <div class="payment-badge" id="payment-wu">
          <svg class="badge-wu" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#ffcc00"/>
            <text x="12" y="16" font-family="'Outfit', sans-serif" font-weight="800" font-size="12" fill="#000000" text-anchor="middle">WU</text>
          </svg>
          <span>Western Union</span>
        </div>

        <!-- Ria Badge -->
        <div class="payment-badge" id="payment-ria">
          <svg class="badge-ria" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
          </svg>
          <span>Ria Money Transfer</span>
        </div>
      </div>

      <div class="footer-divider"></div>

      <!-- Legal & copyright -->
      <div class="footer-bottom-info">
        <div id="footer-copy">© 2026 RedStream™ IPTV. All rights reserved.</div>
        <ul class="footer-links" id="footer-links-list">
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="https://wa.me/212694843943" target="_blank" rel="noopener noreferrer">Contact</a></li>
          <li><a href="/privacy.html">Privacy Policy</a></li>
        </ul>
      </div>

      <!-- Compliance Disclaimer -->
      <p class="disclaimer-text">
        Disclaimer: RedStream™ does not host, upload, or stream any media files. We are a search and custom subscription delivery assistant that helps users connect to stable servers. All streams and TV channels listed are copyright of their respective owners.
      </p>
    </div>
  </footer>

  <!-- Floating Pulsing WhatsApp Button Widget -->
  <a href="https://wa.me/212694843943?text=Hello%20RedStream,%20I%20am%20on%20your%20website%20and%20would%20like%20to%20get%20a%20premium%20IPTV%20trial." class="whatsapp-floating" target="_blank" rel="noopener noreferrer" id="floating-whatsapp-btn" aria-label="Chat with our sales agent on WhatsApp">
    <div class="whatsapp-pulse"></div>
    <!-- Clean WhatsApp SVG -->
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 32px; height: 32px; fill: currentColor; margin: auto; display: block;">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
`;
