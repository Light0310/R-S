import { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Shield, Zap, Tv, Play, Activity, Smartphone } from 'lucide-react';
import { Language } from '../types';

interface FAQItem {
  question: string;
  answer: string;
}

const faqTranslations: Record<Language, { title: string; subtitle: string; items: FAQItem[] }> = {
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about setting up and streaming with RedStream IPTV.",
    items: [
      {
        question: "What makes RedStream the best premium IPTV & Streaming subscription on the market?",
        answer: "Choosing the best premium IPTV & Streaming subscription is crucial for an optimal home entertainment experience. RedStream stands out as the ultimate choice because we leverage cutting-edge Anti-Freeze 9.0 server technology paired with high-bandwidth infrastructure. We do not host overloaded public streams; instead, we invest heavily in private, dedicated server clusters with load balancers. This architectural setup guarantees 99.9% uptime and a completely seamless, stutter-free viewing experience. Our premium subscription offers crystal-clear 4K streaming and live sports with ultra-low latency, ensuring you never miss a goal or a scene."
      },
      {
        question: "Which applications do you support, and how do I perform an IPTV Smarters Pro setup or IBO Player activation?",
        answer: "We pride ourselves on offering universal compatibility across a massive ecosystem of streaming applications. For clients who prefer a simple, feature-rich interface, we provide full support and comprehensive guides for IPTV Smarters Pro setup. Our tech team will walk you through entering your credentials (M3U playlist link or Xtream Codes API parameters) step-by-step. Furthermore, our support agents assist with instant IBO Player activation, Vu Player Pro, TiviMate, and XCIPTV. Once you purchase your subscription, we deliver your credentials via WhatsApp instantly, and our technical engineers remain available 24/7 to ensure your application is fully optimized."
      },
      {
        question: "Is RedStream considered the best IPTV service for Smart TV platforms?",
        answer: "Absolutely! RedStream is widely recognized as the best IPTV service for Smart TV systems, specifically optimized for Samsung Smart TV (Tizen OS), LG Smart TV (WebOS), and Android-based Smart TVs (including Sony, Philips, and Hisense). While other providers struggle with native Smart TV operating systems, our streaming playlists are compressed and structured using advanced codecs that native TV players decode effortlessly. This results in ultra-fast channel zapping speeds (under 1 second) and smooth navigation across Firestick, Android TV, and Apple TV."
      },
      {
        question: "Will I experience freezing or buffering during live sports broadcasts?",
        answer: "No! We guarantee a zero buffering experience, specifically engineered for high-traffic live events. Traditional streaming services buffer constantly during major matches because their servers get overwhelmed. RedStream deploys Anti-Freeze 9.0 technology with proactive capacity scaling. We actively monitor server load and route traffic dynamically. Whether you are watching the Champions League, Premier League, Super Bowl, Formula 1, or UFC, you will enjoy flawless 4K streaming and live sports in real-time."
      },
      {
        question: "How fast is the setup and activation process?",
        answer: "Setup is virtually instant! Once your order is placed, our automated system generates your credentials and sends them directly to our dedicated WhatsApp support team. A real agent will deliver your custom M3U playlist and Xtream Codes login within 5 to 10 minutes. We then guide you through installation on your specific device until your first 4K channel is playing smoothly."
      },
      {
        question: "Can I use my subscription on multiple devices simultaneously?",
        answer: "Your RedStream subscription can be installed on multiple devices (Smart TV, smartphone, tablet, PC, Firestick). However, to guarantee 100% freeze-free streaming, our standard plan supports one active stream at a time. If you need simultaneous multi-screen access for your family, contact our 24/7 WhatsApp support to upgrade to a discounted multi-room connection."
      }
    ]
  },
  fr: {
    title: "Foire Aux Questions",
    subtitle: "Tout ce que vous devez savoir sur la configuration et la diffusion avec RedStream IPTV.",
    items: [
      {
        question: "Qu'est-ce qui fait de RedStream le meilleur abonnement IPTV & Streaming premium du marché ?",
        answer: "Choisir le meilleur abonnement IPTV & Streaming premium est essentiel pour une expérience de divertissement optimale. RedStream se distingue grâce à notre technologie Anti-Freeze 9.0 combinée à une infrastructure de serveurs ultra-moderne. Nous investissons massivement dans des clusters privés avec répartiteurs de charge dédiés pour garantir 99,9% de disponibilité sans coupure ni décalage."
      },
      {
        question: "Quelles applications supportez-vous et comment installer IPTV Smarters Pro ou activer IBO Player ?",
        answer: "Nous offrons une compatibilité universelle avec les meilleures applications. Nous fournissons des guides pas à pas pour l'installation d'IPTV Smarters Pro, l'activation immédiate d'IBO Player, Vu Player Pro, TiviMate et XCIPTV. Vos identifiants sont envoyés sur WhatsApp et nos techniciens vous accompagnent en direct."
      },
      {
        question: "RedStream est-il considéré comme le meilleur service IPTV pour Smart TV ?",
        answer: "Absolument ! RedStream est optimisé pour les téléviseurs Samsung (Tizen OS), LG (webOS), Android TV, Amazon Firestick et Apple TV. Nos flux utilisent des codecs légers offrant un zapping instantané en moins d'une seconde et une interface fluide."
      },
      {
        question: "Vais-je rencontrer des ralentissements ou du buffering pendant les matchs en direct ?",
        answer: "Non ! Nous garantissons une expérience sans coupure, conçue spécialement pour les grands événements sportifs à forte audience (Ligue des Champions, Premier League, Formule 1, UFC). Grâce à notre technologie Anti-Freeze 9.0, profitez d'une diffusion fluide en 4K Ultra HD."
      },
      {
        question: "Quel est le délai pour la mise en service et l'activation ?",
        answer: "L'activation prend entre 5 et 10 minutes ! Dès votre commande, notre équipe sur WhatsApp vous envoie vos accès M3U et Xtream Codes et reste avec vous jusqu'à ce que votre première chaîne s'affiche parfaitement."
      },
      {
        question: "Puis-je utiliser mon abonnement sur plusieurs appareils en même temps ?",
        answer: "Vous pouvez installer votre compte sur tous vos appareils (TV, mobile, tablette, Firestick). Notre offre standard prend en charge 1 écran simultané pour garantir une bande passante 4K maximale. Pour plusieurs écrans en simultané, contactez notre support WhatsApp pour une offre multi-écrans."
      }
    ]
  },
  es: {
    title: "Preguntas Frecuentes",
    subtitle: "Todo lo que necesita saber sobre la configuración y transmisión con RedStream Streaming.",
    items: [
      {
        question: "¿Qué hace que RedStream sea la mejor suscripción Streaming premium del mercado?",
        answer: "Elegir la best premium Streaming subscription (mejor suscripción Streaming premium) es clave para disfrutar del mejor entretenimiento. RedStream destaca como la opción definitiva porque implementamos nuestra Anti-Freeze server technology (tecnología de servidor anticongelación) de última generación, combinada con una infraestructura robusta de servidores privados de alto ancho de banda. Esto garantiza un tiempo de actividad del 99.9% y una experiencia fluida, sin cortes. Si busca deshacerse de los molestos bloqueos, nuestro servicio ofrece 4K streaming and live sports (transmisión 4K y deportes en directo) con una latencia extremadamente baja y máxima nitidez."
      },
      {
        question: "¿Qué aplicaciones soportan y cómo configuro Streaming Smarters Pro o activo IBO Player?",
        answer: "Nos enorgullecemos de ofrecer compatibilidad universal con las mejores aplicaciones. Ofrecemos soporte completo y guías detalladas para Streaming Smarters Pro setup, guiándole paso a paso para configurar su lista M3U o Xtream Codes. También nos especializamos en aplicaciones de alto rendimiento, ayudándole con la IBO Player activation instantánea o la configuración en TiviMate, Smart Streaming y Duplex Play. Al comprar su suscripción, enviamos las credenciales al instante por WhatsApp con soporte técnico 24/7."
      },
      {
        question: "¿Es RedStream considerado el mejor Streaming para Smart TV?",
        answer: "¡Totalmente! RedStream es aclamado como el best Streaming for Smart TV, optimizado para televisores Samsung (Tizen OS), LG (webOS) y Android TV (Sony, Philips, Hisense). Nuestras transmisiones utilizan códecs de compresión avanzados que los reproductores nativos de televisión decodifican sin esfuerzo, logrando un cambio de canal en menos de 1 segundo y navegación fluida. También está optimizado para Amazon Firestick, Apple TV y dispositivos Android."
      },
      {
        question: "¿Experimentaré congelaciones o buffering durante transmisiones de deportes en vivo?",
        answer: "¡No! Garantizamos una experiencia con zero buffering (cero almacenamiento en búfer) en eventos deportivos en directo de gran tráfico. Mientras otros servicios fallan por la saturación, RedStream utiliza Anti-Freeze server technology con balanceadores de carga inteligentes que distribuyen el tráfico de manera dinámica. Así disfrutará de 4K streaming and live sports fluidos y sin interrupciones en tiempo real."
      },
      {
        question: "¿Qué tan rápido es el proceso de configuración y activación?",
        answer: "¡El proceso es prácticamente instantáneo! Al confirmar su compra, generamos sus credenciales y las enviamos a nuestro soporte de WhatsApp en un plazo de 10 a 15 minutos. Le ayudaremos paso a paso con la Streaming Smarters Pro setup, el código de IBO Player activation o la configuración en su Smart TV. No cerramos el chat hasta que esté reproduciendo sus canales favoritos en 4K."
      },
      {
        question: "¿Puedo usar mi suscripción en múltiples dispositivos simultáneamente?",
        answer: "Puede instalar su suscripción en todos los dispositivos que desee (Smart TV, móvil, tableta, PC, Firestick), pero para mantener la máxima estabilidad y disfrutar de una transmisión con zero buffering, nuestro plan estándar permite una sola reproducción activa a la vez. Si necesita reproducir en múltiples pantallas al mismo tiempo, contáctenos por WhatsApp para obtener un paquete multi-room con un gran descuento."
      }
    ]
  },
  de: {
    title: "Häufig Gestellte Fragen",
    subtitle: "Alles, was Sie über die Einrichtung und das Streaming mit RedStream Streaming wissen müssen.",
    items: [
      {
        question: "Was macht RedStream zum besten Premium-Streaming-Abonnement auf dem Markt?",
        answer: "Die Wahl des best premium Streaming subscription (besten Premium-Streaming-Abonnements) ist entscheidend für erstklassiges Heimkino. RedStream setzt Maßstäbe, da wir modernste Anti-Freeze server technology (Anti-Freeze-Server-Technologie) mit einer High-End-Infrastruktur kombinieren. Wir nutzen keine überlasteten öffentlichen Streams, sondern investieren in private Hochgeschwindigkeits-Servercluster mit dedizierten Load-Balancern. Dies garantiert 99,9 % Uptime und ruckelfreies Streaming. Erleben Sie glasklares 4K streaming and live sports (4K-Streaming und Live-Sport) mit minimaler Latenz."
      },
      {
        question: "Welche Apps werden unterstützt und wie funktioniert die Einrichtung von Streaming Smarters Pro oder IBO Player?",
        answer: "Wir unterstützen das gesamte Spektrum moderner Streaming-Apps. Für eine intuitive Bedienung bieten wir eine bebilderte Anleitung für das Streaming Smarters Pro setup. Zudem unterstützen wir Sie bei der schnellen IBO Player activation sowie der Einrichtung auf TiviMate, Smart Streaming und Duplex Play. Nach dem Kauf senden wir Ihnen die Zugangsdaten sofort per WhatsApp und unser technischer Support steht Ihnen rund um die Uhr zur Seite."
      },
      {
        question: "Ist RedStream das beste Streaming für Smart TV-Plattformen?",
        answer: "Absolut! RedStream gilt als das best Streaming for Smart TV, perfekt optimiert für Samsung Smart TV (Tizen OS), LG Smart TV (webOS) und Android-basierte Fernseher (Sony, Philips, Hisense). Unsere Streams nutzen fortschrittliche Codecs, die Smart-TVs mühelos dekodieren. Das Ergebnis sind Umschaltzeiten unter 1 Sekunde und flüssiges Zapping. Auch für Amazon Firestick, Apple TV und Android-Boxen ist der Dienst optimal."
      },
      {
        question: "Wird es beim Live-Sport zu Rucklern oder Buffering kommen?",
        answer: "Nein! Wir garantieren eine Übertragung mit zero buffering (ohne Buffering), speziell optimiert für globale Live-Events. RedStream löst Überlastungsprobleme durch den Einsatz unserer proprietären Anti-Freeze server technology mit intelligenter Lastverteilung. Egal ob Champions League, Formel 1 oder Pay-per-View-Events – Sie genießen 4K streaming and live sports ohne Unterbrechungen in Echtzeit."
      },
      {
        question: "Wie schnell erfolgt die Einrichtung und Freischaltung?",
        answer: "Die Aktivierung läuft extrem schnell! Direkt nach Zahlungseingang generiert unser System Ihre Zugangsdaten und sendet sie an unser WhatsApp-Supportteam. Ein Support-Mitarbeiter liefert Ihre M3U-Wiedergabeliste und Xtream Codes innerhalb von 10 bis 15 Minuten. Wir begleiten Sie durch das Streaming Smarters Pro setup oder die IBO Player activation, bis die ersten Kanäle fehlerfrei in 4K laufen."
      },
      {
        question: "Kann ich mein Abonnement auf mehreren Geräten gleichzeitig nutzen?",
        answer: "Sie können Ihre RedStream-Zugangsdaten auf beliebig vielen Geräten einrichten (Smart TV, Smartphone, Tablet, PC, Firestick). Um jedoch die Serverstabilität und ein Erlebnis mit zero buffering zu gewährleisten, unterstützt unser Standard-Tarif jeweils eine aktive Verbindung. Für gleichzeitiges Streaming auf mehreren Geräten bieten wir stark rabattierte Multi-Screen-Pakete per WhatsApp an."
      }
    ]
  },
  nl: {
    title: "Veelgestelde Vragen",
    subtitle: "Alles wat u moet weten over de installatie en het streamen met RedStream Streaming.",
    items: [
      {
        question: "Wat maakt RedStream het beste premium Streaming-abonnement op de markt?",
        answer: "Het kiezen van het best premium Streaming subscription (beste premium Streaming-abonnement) is essentieel voor de ultieme tv-ervaring. RedStream onderscheidt zich door de inzet van geavanceerde Anti-Freeze server technology gekoppeld aan een ultramoderne serverinfrastructuur. Wij maken geen gebruik van overbelaste openbare streams; we investeren in private high-bandwidth serverclusters met load-balancers. Dit garandeert een uptime van 99.9% en vloeiend streamen zonder haperingen. Geniet van haarscherpe 4K streaming and live sports met minimale vertraging."
      },
      {
        question: "Welke apps ondersteunen jullie en hoe werkt de Streaming Smarters Pro of IBO Player activatie?",
        answer: "Wij ondersteunen vrijwel alle populaire streaming-apps. Voor een eenvoudige, rijke interface bieden we volledige begeleiding bij de Streaming Smarters Pro setup. Daarnaast helpen we u bij de directe IBO Player activation of installatie op TiviMate, Smart Streaming en Duplex Play. Na aankoop sturen we uw inloggegevens direct via WhatsApp, en onze technische helpdesk is 24/7 beschikbaar om u op weg te helpen."
      },
      {
        question: "Wordt RedStream gezien als de beste Streaming voor Smart TV?",
        answer: "Zeker weten! RedStream is geoptimaliseerd als de best Streaming for Smart TV, specifiek voor Samsung Smart TV (Tizen OS), LG Smart TV (webOS) en Android TV's (Sony, Philips, Hisense). Onze streams gebruiken moderne codecs die televisies moeitensloos decoderen. Dit zorgt voor razendsnelle zaptijden (minder dan 1 seconde). De dienst werkt ook perfect op Amazon Firestick, Apple TV en Android-boxen."
      },
      {
        question: "Zal ik haperingen of buffering ervaren tijdens live sportwedstrijden?",
        answer: "Nee! Wij garanderen een ervaring met zero buffering (geen haperingen), speciaal ontwikkeld voor live sportevenementen met veel kijkers. RedStream voorkomt overbelasting door onze Anti-Freeze server technology met proactieve schaling. Of u nu kijkt naar de Champions League, Formule 1 of UFC-gevechten, u geniet van vloeiende 4K streaming and live sports in real-time, zonder onderbrekingen."
      },
      {
        question: "Hoe snel is de installatie en activatie?",
        answer: "De installatie is vrijwel direct! Zodra de betaling is afgerond, genereert ons systeem uw inloggegevens en stuurt deze naar ons WhatsApp-supportteam. Binnen 10 tot 15 minuten ontvangt u uw M3U-afspeellijst en Xtream Codes. We loodsen u stap voor stap door de Streaming Smarters Pro setup of IBO Player activation heen, totdat alles soepel in 4K afspeelt."
      },
      {
        question: "Kan ik mijn abonnement op meerdere apparaten tegelijkertijd gebruiken?",
        answer: "U kunt uw RedStream-abonnement op al uw apparaten installeren (Smart TV, smartphone, tablet, pc, Firestick). Om de serverkwaliteit en een stream met zero buffering te garanderen, staat ons standaardpakket één actieve stream tegelijkertijd toe. Wilt u op meerdere apparaten tegelijk kijken? Vraag onze WhatsApp-support naar de scherp geprijsde multi-room pakketten."
      }
    ]
  },
  ru: {
    title: "Часто Задаваемые Вопросы",
    subtitle: "Все, что вам нужно знать о настройке и просмотре трансляций с RedStream Streaming.",
    items: [
      {
        question: "Что делает RedStream лучшей премиальной подпиской на Streaming?",
        answer: "Выбор best premium Streaming subscription (лучшей премиум подписки) критически важен для качественного просмотра. RedStream выделяется благодаря передовой Anti-Freeze server technology (технологии защиты от зависаний) и мощной инфраструктуре серверов. Мы не используем перегруженные публичные потоки, а инвестируем в частные высокоскоростные серверные кластеры с балансировщиками нагрузки. Это гарантирует 99.9% стабильности и плавный просмотр без задержек. Наш сервис предлагает кристально чистый 4K streaming and live sports (стриминг в 4K и спортивные трансляции) с ультранизкой задержкой."
      },
      {
        question: "Какие приложения вы поддерживаете и как настроить Streaming Smarters Pro или активировать IBO Player?",
        answer: "Мы поддерживаем все популярные плееры. Для тех, кто предпочитает простой интерфейс, мы предлагаем пошаговое руководство для Streaming Smarters Pro setup (настройки Streaming Smarters Pro). Также мы помогаем с мгновенной IBO Player activation (активацией IBO Player) и установкой на TiviMate, Smart Streaming и Duplex Play. Сразу после оплаты вы получите все доступы через WhatsApp, а наша техподдержка работает 24/7."
      },
      {
        question: "Считается ли RedStream лучшим Streaming для Smart TV?",
        answer: "Абсолютно! RedStream признан как best Streaming for Smart TV (лучший Streaming для Smart TV), оптимизированный для Samsung (Tizen OS), LG (webOS) и Android TV (Sony, Philips, Hisense). Наши трансляции сжимаются современными кодеками, которые телевизоры декодируют мгновенно. Переключение каналов занимает менее 1 секунды. Сервис также идеально оптимизирован под Amazon Firestick, Apple TV и Android приставки."
      },
      {
        question: "Будут ли зависания во время прямых трансляций спорта?",
        answer: "Нет! Мы гарантируем просмотр с zero buffering (без буферизации), созданный для пиковых нагрузок во время важных матчей. RedStream решает проблему перегрузок благодаря Anti-Freeze server technology и динамическому распределению трафика. Будь то Лига Чемпионов, Формула 1 или бои UFC, вы получите идеальный 4K streaming and live sports в реальном времени."
      },
      {
        question: "Как быстро происходит настройка и активация подписки?",
        answer: "Активация происходит практически мгновенно! После подтверждения заказа система создает доступы и передает их в WhatsApp. В течение 10–15 минут оператор отправит ваш M3U-плейлист и Xtream-коды. Мы поможем вам настроить Streaming Smarters Pro setup, ввести код для IBO Player activation или настроить ваш Smart TV, пока все не заработает в 4K."
      },
      {
        question: "Могу ли я использовать подписку на нескольких устройствах одновременно?",
        answer: "Вы можете установить плейлист на любые свои устройства (Smart TV, смартфон, планшет, ПК, Firestick). Однако для поддержания стабильности и стриминга с zero buffering стандартный тариф поддерживает только одно активное подключение в один момент времени. Если вам нужно смотреть разные каналы одновременно на нескольких экранах, напишите нам в WhatsApp, и мы подберем выгодный мультирум-тариф."
      }
    ]
  },
  ar: {
    title: "الأسئلة الشائعة والاستفسارات",
    subtitle: "كل ما تحتاج إلى معرفته حول إعداد وتشغيل خدمة RedStream Streaming الممتازة.",
    items: [
      {
        question: "ما الذي يجعل RedStream أفضل اشتراك Streaming ممتاز (best premium Streaming subscription) في السوق؟",
        answer: "يعد اختيار أفضل اشتراك Streaming متميز (best premium Streaming subscription) أمرًا حيويًا للحصول على تجربة ترفيه منزلي مثالية. يتميز RedStream كخيار أول بفضل تقنيتنا المتطورة Anti-Freeze server technology (تقنية منع التقطيع) المقترنة ببنية تحتية قوية للخوادم الخاصة ذات النطاق العريض. نحن لا نستخدم البثوث العامة المزدحمة، بل نستثمر في خوادم خاصة سريعة تضمن استقرارًا بنسبة 99.9% وتشغيلًا سلسًا للغاية. ستحصل على بث بجودة 4K streaming and live sports (بث 4K والرياضات المباشرة) دون أي انقطاع وبأقل زمن تأخير ممكن."
      },
      {
        question: "ما هي التطبيقات التي تدعمونها، وكيف أقوم بإعداد Streaming Smarters Pro أو تفعيل IBO Player؟",
        answer: "نحن ندعم طيفًا واسعًا من تطبيقات البث الذكية. بالنسبة للعملاء الذين يفضلون واجهة غنية وسهلة، نقدم دعمًا وإرشادات كاملة لـ Streaming Smarters Pro setup (إعداد تطبيق سمارترز). كما نساعدك في تفعيل تطبيق إيبو بلاير فورًا (IBO Player activation) أو التشغيل على تطبيقات TiviMate و Smart Streaming و Duplex Play. بعد الشراء، نرسل بياناتك فورًا عبر WhatsApp مع توفير دعم فني مخصص على مدار الساعة 24/7 لضمان سهولة الإعداد."
      },
      {
        question: "هل يعتبر RedStream أفضل اشتراك Streaming للشاشات الذكية (best Streaming for Smart TV)؟",
        answer: "بكل تأكيد! يعتبر RedStream على نطاق واسع بمثابة أفضل Streaming للشاشات الذكية (best Streaming for Smart TV)، وهو متوافق ومحسن بشكل مثالي لشاشات سامسونج (Tizen OS)، وإل جي (webOS)، وشاشات أندرويد (مثل سوني، وفيليبس، وهايسنس). تستخدم خوادمنا برمجيات ترميز متقدمة تفك الشاشات تشفيرها بسهولة، مما يمنحك سرعة تنقل فائقة بين القنوات في أقل من ثانية واحدة، بالإضافة إلى التوافق التام مع أجهزة Amazon Firestick و Apple TV وأجهزة أندرويد بوكس."
      },
      {
        question: "هل سأواجه أي تقطيع أو بطء (buffering) أثناء بث المباريات والرياضات المباشرة؟",
        answer: "كلا على الإطلاق! نحن نضمن لك تجربة مشاهدة خالية من التقطيع (zero buffering)، مصممة خصيصًا للأحداث المباشرة الكبرى. تحل RedStream مشكلة التكدس في أوقات الذروة من خلال تشغيل Anti-Freeze server technology وتوزيع حركة البث ديناميكيًا. سواء كنت تتابع دوري أبطال أوروبا، الفورمولا 1، أو نزالات الملاكمة، ستستمتع بالبث الفائق 4K streaming and live sports في الوقت الفعلي بثبات تام كالاشتراك الرسمي."
      },
      {
        question: "ما هي سرعة عملية الإعداد والتفعيل للاشتراك الخاص بي؟",
        answer: "التفعيل فوري وشبه لحظي! بمجرد تأكيد طلبك الآمن، يولد نظامنا بيانات الدخول ويرسلها فورًا إلى فريق الدعم عبر واتساب. في غضون 10 إلى 15 دقيقة، سيسلمك الوكيل رابط M3U وبيانات Xtream Codes، ويرشدك خطوة بخطوة لإتمام Streaming Smarters Pro setup أو كود تفعيل IBO Player activation والتشغيل على شاشتك حتى تعمل أول قناة أمامك بجودة 4K."
      },
      {
        question: "هل يمكنني تشغيل اشتراكي على عدة أجهزة في نفس الوقت؟",
        answer: "يمكنك تثبيت اشتراك RedStream على أي عدد تريده من الأجهزة (الشاشة الذكية، الهاتف، الجهاز اللوحي، الكمبيوتر، الفاير ستيك)، ولكن لضمان جودة البث وثباته مع ميزة zero buffering، فإن اشتراكنا القياسي يدعم تشغيل جهاز واحد في نفس الوقت. إذا كنت بحاجة لتشغيل البث على عدة أجهزة في وقت واحد دون انقطاع، يرجى التواصل مع فريقنا عبر واتساب للحصول على باقة عائلية (multi-room) مخفضة للغاية ومناسبة لاحتياجاتك."
      }
    ]
  }
};

interface FAQSectionProps {
  currentLang: Language;
}

export default function FAQSection({ currentLang }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const t = faqTranslations[currentLang] || faqTranslations.en;
  const isRtl = currentLang === 'ar';

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Shield className="w-5 h-5 text-[#e50914] shrink-0" />;
      case 1: return <Zap className="w-5 h-5 text-[#e50914] shrink-0" />;
      case 2: return <Tv className="w-5 h-5 text-[#e50914] shrink-0" />;
      case 3: return <Activity className="w-5 h-5 text-[#e50914] shrink-0" />;
      case 4: return <Play className="w-5 h-5 text-[#e50914] shrink-0" />;
      default: return <Smartphone className="w-5 h-5 text-[#e50914] shrink-0" />;
    }
  };

  return (
    <section className="faq-wrapper" id="faq">
      <div className="faq-container" dir={isRtl ? "rtl" : "ltr"}>
        <div className="text-center mb-12 max-w-[650px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#e50914]/15 border border-[#e50914]/30 text-[#ff4d4d] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support &amp; Knowledge Base</span>
          </div>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-white uppercase tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          {t.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-header-btn"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  <div className="faq-header-left">
                    <div className="faq-icon-box">
                      {getIcon(index)}
                    </div>
                    <span className="faq-question-text">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`faq-chevron ${isOpen ? 'rotate' : ''}`}
                  />
                </button>
                
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="faq-body-content">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
