export interface CountryConfig {
  slug: string;
  name: string;
  nativeName: string;
  flag: string;
  lang: 'fr' | 'en' | 'es' | 'de' | 'nl' | 'ar';
  currency: string;
  currencySymbol: string;
  primaryCity: string;
  headline: string;
  subheadline: string;
  localChannels: string[];
  localSports: string[];
  localISPs: string[];
  metaTitle: string;
  metaDesc: string;
}

export const COUNTRIES_DATA: Record<string, CountryConfig> = {
  france: {
    slug: 'france',
    name: 'France',
    nativeName: 'France',
    flag: '🇫🇷',
    lang: 'fr',
    currency: 'EUR',
    currencySymbol: '€',
    primaryCity: 'Paris',
    headline: 'Meilleur Abonnement IPTV en France (2026) — 4K Sans Coupure',
    subheadline: 'Profitez de plus de 20 000 chaînes françaises et internationales en 4K UHD 60 FPS avec technologie Anti-Freeze 9.0. Compatible avec Orange, Free, SFR et Bouygues Telecom sans aucun blocage.',
    localChannels: ['Canal+ UHD', 'Canal+ Foot', 'beIN Sports France 1-10', 'DAZN Ligue 1', 'RMC Sport', 'TF1 4K', 'M6 HDR', 'Eurosport 1 & 2'],
    localSports: ['Ligue 1 McDonald’s', 'Ligue des Champions UEFA', 'Premier League', 'Top 14 Rugby', 'Formule 1 (Canal+)', 'Roland-Garros'],
    localISPs: ['Orange Livebox', 'Freebox Pop / Ultra', 'SFR Box', 'Bouygues Bbox'],
    metaTitle: 'Abonnement IPTV France 4K Sans Coupure (2026) — Test 24h & Code Xtream',
    metaDesc: 'Abonnement IPTV premium n°1 en France. Chaînes Canal+, beIN Sports, DAZN en 4K 60FPS sans blocage FAI. Compatible Firestick, Smart TV Samsung, LG et TiviMate.'
  },
  uk: {
    slug: 'uk',
    name: 'United Kingdom',
    nativeName: 'United Kingdom',
    flag: '🇬🇧',
    lang: 'en',
    currency: 'GBP',
    currencySymbol: '£',
    primaryCity: 'London',
    headline: 'Best 4K IPTV Service in the United Kingdom (2026) — Zero Buffering',
    subheadline: 'Watch 20,000+ UK & worldwide live channels with dedicated 60 FPS sports streams and 99.9% uptime. Fully optimized to bypass BT, Sky, and Virgin Media peak throttling with Anti-Freeze 9.0.',
    localChannels: ['Sky Sports Main Event 4K', 'Sky Sports Premier League', 'TNT Sports 1-4 Ultimate', 'BBC One HD', 'ITV1 4K', 'Premier Sports', 'Viaplay UK'],
    localSports: ['English Premier League (3PM Kickoffs)', 'UEFA Champions League', 'FA Cup', 'Formula 1 Sky UHD', 'Six Nations Rugby', 'PDC World Darts'],
    localISPs: ['BT Broadband', 'Virgin Media Gigaclear', 'Sky Broadband', 'Vodafone UK', 'EE Fiber'],
    metaTitle: 'Best UK IPTV Subscription 4K (2026) — Premier League 60FPS & 24h Pass',
    metaDesc: 'Top-rated UK IPTV provider. Stream Premier League 3PM matches, Sky Sports, and TNT Sports in UHD 4K without freezing. Compatible with Firestick, TiviMate & Smart TVs.'
  },
  belgique: {
    slug: 'belgique',
    name: 'Belgium',
    nativeName: 'Belgique',
    flag: '🇧🇪',
    lang: 'fr',
    currency: 'EUR',
    currencySymbol: '€',
    primaryCity: 'Bruxelles',
    headline: 'Abonnement IPTV Belgique (2026) — Chaînes Belges & Sport 4K',
    subheadline: 'Toutes les chaînes belges francophones et flamandes ainsi que le football européen en Ultra Haute Définition. Connexion fluide garantie sur Proximus, VOO et Telenet.',
    localChannels: ['RTBF La Une & Tipik', 'RTL-TVI & Club RTL', 'Eleven Sports / DAZN Belgique', 'VTM', 'Play Sports', 'Canal+ Sport'],
    localSports: ['Jupiler Pro League', 'Ligue des Champions', 'Formule 1 (RTBF)', 'Cyclisme Tour des Flandres', 'Diables Rouges'],
    localISPs: ['Proximus Fiber', 'VOO', 'Telenet', 'Orange Belgique'],
    metaTitle: 'Abonnement IPTV Belgique 4K (2026) — DAZN Belgique, RTBF & RTL TVI',
    metaDesc: 'Meilleur abonnement IPTV en Belgique. Regardez la Jupiler Pro League, DAZN et chaînes francophones en 4K sans interruption. Test 24h instantané.'
  },
  suisse: {
    slug: 'suisse',
    name: 'Switzerland',
    nativeName: 'Suisse',
    flag: '🇨🇭',
    lang: 'fr',
    currency: 'CHF',
    currencySymbol: 'CHF',
    primaryCity: 'Genève / Zürich',
    headline: 'Abonnement IPTV Suisse 4K (2026) — Sans Latence sur Swisscom & Sunrise',
    subheadline: 'Le service de streaming de référence en Suisse. Plus de 20 000 chaînes en direct et 60 000 VOD avec serveurs européens ultra-rapides et support réactif 7j/7.',
    localChannels: ['RTS 1 & 2 HD', 'SRF 1 & Zwei', 'blue Sport 1-10 UHD', 'Canal+ Suisse', 'Sky Sport CH'],
    localSports: ['Super League Suisse', 'UEFA Champions League', 'Ski Alpin Coupe du Monde', 'Ligue des Champions blue Sport', 'Formule 1 RTS'],
    localISPs: ['Swisscom Fibre', 'Sunrise UPC', 'Salt Fiber', 'Quickline'],
    metaTitle: 'Abonnement IPTV Suisse 4K Ultra HD (2026) — RTS, blue Sport & Canal+',
    metaDesc: 'Profitez du meilleur IPTV en Suisse romande et alémanique. Flux 4K 60FPS haute vitesse sans saccades sur Swisscom et Sunrise. Essai 24h disponible.'
  },
  espana: {
    slug: 'espana',
    name: 'Spain',
    nativeName: 'España',
    flag: '🇪🇸',
    lang: 'es',
    currency: 'EUR',
    currencySymbol: '€',
    primaryCity: 'Madrid',
    headline: 'El Mejor Servicio IPTV en España (2026) — 4K Estable y Sin Cortes',
    subheadline: 'Disfruta de todo el fútbol de LaLiga EA Sports, Champions League y cine en calidad 4K 60 FPS con tecnología Anti-Freeze 9.0. Compatible con Movistar, Vodafone, Orange y Digi sin bloqueos.',
    localChannels: ['Movistar+ LaLiga 4K', 'Movistar+ Liga de Campeones', 'DAZN LaLiga 1-4', 'Movistar Deportes', 'La 1 UHD 4K', 'Antena 3', 'Telecinco'],
    localSports: ['LaLiga EA Sports', 'Copa del Rey', 'UEFA Champions League', 'MotoGP DAZN', 'Fórmula 1 DAZN', 'Liga Endesa ACB'],
    localISPs: ['Movistar Fibra', 'Digi Mobil', 'Vodafone España', 'Orange Fibra', 'MásMóvil'],
    metaTitle: 'Mejor IPTV España 4K Sin Cortes (2026) — LaLiga, Movistar y DAZN',
    metaDesc: 'Suscripción IPTV premium n°1 en España. Todo el fútbol de LaLiga y DAZN en 4K 60FPS con servidores estables. Prueba de 24 horas y soporte WhatsApp.'
  },
  germany: {
    slug: 'germany',
    name: 'Germany',
    nativeName: 'Deutschland',
    flag: '🇩🇪',
    lang: 'de',
    currency: 'EUR',
    currencySymbol: '€',
    primaryCity: 'Berlin',
    headline: 'Bestes IPTV in Deutschland (2026) — 4K UHD Ohne Ruckeln',
    subheadline: 'Erleben Sie über 20.000 deutsche und internationale Live-Kanäle sowie Bundesliga und Champions League in gestochen scharfem 4K mit Anti-Freeze 9.0. Kompatibel mit Telekom, Vodafone und 1&1.',
    localChannels: ['Sky Sport Bundesliga UHD', 'Sky Sport Top Event', 'DAZN 1 & 2 Deutschland', 'Magenta TV 4K', 'ARD & ZDF HD', 'RTL UHD', 'ProSieben HD'],
    localSports: ['Fußball Bundesliga', 'UEFA Champions League', 'DFB-Pokal', 'Formel 1 Sky Sport UHD', 'EHF Champions League'],
    localISPs: ['Deutsche Telekom Glasfaser', 'Vodafone Kabel / Glasfaser', '1&1', 'O2 Telefónica'],
    metaTitle: 'Bestes IPTV Deutschland 4K (2026) — Bundesliga & Sky Sport Ohne Ruckeln',
    metaDesc: 'Premium IPTV Anbieter für Deutschland. Alle Bundesliga Spiele, Sky Sport und DAZN in nativem 4K 60FPS. 24h VIP-Test und WhatsApp-Sofortaktivierung.'
  },
  netherlands: {
    slug: 'netherlands',
    name: 'Netherlands',
    nativeName: 'Nederland',
    flag: '🇳🇱',
    lang: 'nl',
    currency: 'EUR',
    currencySymbol: '€',
    primaryCity: 'Amsterdam',
    headline: 'Beste IPTV Abonnement Nederland (2026) — 4K Zonder Haperen',
    subheadline: 'Kijk naar meer dan 20.000 Nederlandse en wereldwijde zenders in Ultra HD 4K met onze Anti-Freeze 9.0 servers. Volledig geoptimaliseerd voor KPN, Ziggo en Odido.',
    localChannels: ['ESPN 1-4 UHD Nederland', 'Ziggo Sport Totaal 1-6', 'Viaplay Nederland', 'NPO 1 4K', 'RTL 4 HD', 'SBS 6'],
    localSports: ['Eredivisie Voetbal', 'Formule 1 (Max Verstappen)', 'Champions League Ziggo', 'Premier League Viaplay', 'Darts PDC'],
    localISPs: ['KPN Glasvezel', 'Ziggo Kabel', 'Odido Glasvezel', 'Delta'],
    metaTitle: 'Beste IPTV Nederland 4K (2026) — Eredivisie, ESPN & Viaplay Zonder Freeze',
    metaDesc: 'Betrouwbaar IPTV abonnement in Nederland. Kijk Formule 1, Eredivisie en ESPN in 4K 60FPS zonder haperingen. 24 uur test en 24/7 WhatsApp ondersteuning.'
  }
};
