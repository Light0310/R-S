export function generateSvgThumbnail(title: string, description: string = ''): string {
    let clean = title.split(':')[0].replace(/[^a-zA-Z0-9\s-]/g, '').trim().toUpperCase();
    let words = clean.split(' ').filter(Boolean);
    
    let top = '';
    let mid = '';
    let bot = '';

    if (words.length <= 1) {
        mid = words.join('');
    } else if (words.length === 2) {
        top = words[0];
        mid = words[1];
    } else if (words.length === 3) {
        top = words[0];
        mid = words[1];
        bot = words[2];
    } else {
        top = words.slice(0, 2).join(' ');
        mid = words.slice(2, 4).join(' ');
        bot = words.slice(4, 7).join(' ');
    }

    let desc = description || "Step-by-Step Setup for the Best Streaming Experience";
    if (desc.length > 55) desc = desc.substring(0, 55) + '...';

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
<defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#220000" stroke-width="1"/>
    </pattern>
    <filter id="red-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="25" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="intense-red-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="60" result="blur" />
        <feComponentTransfer in="blur" result="glow">
            <feFuncA type="linear" slope="1.5"/>
        </feComponentTransfer>
        <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#00d2ff" />
        <stop offset="100%" stop-color="#3a7bd5" />
    </linearGradient>
    <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff0844" />
        <stop offset="100%" stop-color="#ffb199" />
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#9d50bb" />
        <stop offset="100%" stop-color="#6e48aa" />
    </linearGradient>
</defs>

<rect width="1280" height="720" fill="#050505"/>
<rect width="1280" height="720" fill="url(#grid)"/>

<circle cx="200" cy="200" r="150" fill="#ff0000" opacity="0.15" filter="url(#intense-red-glow)"/>
<circle cx="1000" cy="300" r="200" fill="#ff0000" opacity="0.1" filter="url(#intense-red-glow)"/>

<!-- LEFT SIDE -->
<g transform="translate(80, 160)">
    <text y="0" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="52" text-transform="uppercase" letter-spacing="2">${top}</text>
    <text y="100" fill="#FF1E27" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="110" text-transform="uppercase" filter="url(#red-glow)" letter-spacing="1">${mid}</text>
    <text y="180" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="52" text-transform="uppercase" letter-spacing="2">${bot}</text>

    <line x1="0" y1="230" x2="450" y2="230" stroke="#FF1E27" stroke-width="4"/>
    <text y="275" fill="#cccccc" font-family="system-ui, -apple-system, sans-serif" font-size="24">${desc}</text>

    <g transform="translate(0, 330)">
        <circle cx="24" cy="24" r="22" fill="none" stroke="#FF1E27" stroke-width="2"/>
        <path d="M14 16h20v14H14z" fill="none" stroke="#FF1E27" stroke-width="2"/>
        <text x="60" y="20" fill="#ffffff" font-family="system-ui" font-weight="bold" font-size="18">LIVE TV</text>
        <text x="60" y="40" fill="#888888" font-family="system-ui" font-size="14">Instant Streams</text>
    </g>
    <g transform="translate(240, 330)">
        <circle cx="24" cy="24" r="22" fill="none" stroke="#FF1E27" stroke-width="2"/>
        <circle cx="24" cy="24" r="8" fill="none" stroke="#FF1E27" stroke-width="2"/>
        <text x="60" y="20" fill="#ffffff" font-family="system-ui" font-weight="bold" font-size="18">MOVIES</text>
        <text x="60" y="40" fill="#888888" font-family="system-ui" font-size="14">60K+ VOD Titles</text>
    </g>
    <g transform="translate(0, 410)">
        <circle cx="24" cy="24" r="22" fill="none" stroke="#FF1E27" stroke-width="2"/>
        <text x="14" y="30" fill="#FF1E27" font-family="system-ui" font-weight="bold" font-size="16">4K</text>
        <text x="60" y="20" fill="#ffffff" font-family="system-ui" font-weight="bold" font-size="18">ULTRA HD</text>
        <text x="60" y="40" fill="#888888" font-family="system-ui" font-size="14">Crisp 4K Clustered</text>
    </g>
    <g transform="translate(240, 410)">
        <circle cx="24" cy="24" r="22" fill="none" stroke="#FF1E27" stroke-width="2"/>
        <path d="M24 10v6m0 16v-6m-8-2l4-4m12 12l-4-4" stroke="#FF1E27" stroke-width="2"/>
        <text x="60" y="20" fill="#ffffff" font-family="system-ui" font-weight="bold" font-size="18">EASY SETUP</text>
        <text x="60" y="40" fill="#888888" font-family="system-ui" font-size="14">Takes 10 Minutes</text>
    </g>
</g>

<!-- RIGHT SIDE -->
<g transform="translate(620, 80)">
    <rect x="0" y="0" width="580" height="360" rx="12" fill="#121215" stroke="#2a2a30" stroke-width="4" filter="url(#red-glow)"/>
    <rect x="10" y="10" width="560" height="340" rx="6" fill="#08080a"/>
    <text x="30" y="45" fill="#ffffff" font-family="system-ui" font-weight="900" font-size="18">IPTV <tspan fill="#FF1E27">SMARTERS</tspan></text>
    
    <circle cx="480" cy="38" r="6" fill="none" stroke="#aaa" stroke-width="2"/>
    <path d="M485 43l8 8" stroke="#aaa" stroke-width="2"/>

    <rect x="30" y="80" width="150" height="190" rx="16" fill="url(#cyanGrad)"/>
    <rect x="85" y="145" width="40" height="30" rx="6" fill="none" stroke="#fff" stroke-width="3"/>
    <text x="105" y="240" fill="#ffffff" font-family="system-ui" font-weight="bold" font-size="16" text-anchor="middle">LIVE TV</text>

    <rect x="205" y="80" width="150" height="190" rx="16" fill="url(#pinkGrad)"/>
    <polygon points="265,140 265,180 295,160" fill="#fff"/>
    <text x="280" y="240" fill="#ffffff" font-family="system-ui" font-weight="bold" font-size="16" text-anchor="middle">MOVIES</text>

    <rect x="380" y="80" width="150" height="190" rx="16" fill="url(#purpleGrad)"/>
    <path d="M435 145h40v30h-40zM445 140v10M465 140v10" fill="none" stroke="#fff" stroke-width="3"/>
    <text x="455" y="240" fill="#ffffff" font-family="system-ui" font-weight="bold" font-size="16" text-anchor="middle">SERIES</text>
    
    <rect x="30" y="295" width="120" height="30" rx="4" fill="none" stroke="#00d2ff" stroke-width="1"/>
    <text x="90" y="315" fill="#00d2ff" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">EPG LIVE TV</text>

    <rect x="160" y="295" width="120" height="30" rx="4" fill="none" stroke="#888" stroke-width="1"/>
    <text x="220" y="315" fill="#888" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">MULTI-SCREEN</text>

    <rect x="420" y="290" width="130" height="35" rx="4" fill="#a8cf45"/>
    <text x="485" y="312" fill="#000" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">ORDER ACTIVE</text>
</g>

<!-- Phone -->
<g transform="translate(1020, 360)">
    <rect x="0" y="0" width="160" height="320" rx="24" fill="#151515" stroke="#333" stroke-width="4"/>
    <rect x="8" y="8" width="144" height="304" rx="18" fill="#08080a"/>
    <rect x="50" y="12" width="60" height="16" rx="8" fill="#000"/>
    
    <text x="80" y="70" fill="#ffffff" font-family="system-ui" font-weight="900" font-size="12" text-anchor="middle">IPTV <tspan fill="#FF1E27">SMARTERS</tspan></text>
    
    <rect x="20" y="110" width="120" height="24" rx="4" fill="#1a1a20" stroke="#333" stroke-width="1"/>
    <text x="30" y="126" fill="#666" font-family="system-ui" font-size="10">Any Name</text>
    
    <rect x="20" y="145" width="120" height="24" rx="4" fill="#1a1a20" stroke="#333" stroke-width="1"/>
    <text x="30" y="161" fill="#666" font-family="system-ui" font-size="10">Username</text>
    
    <rect x="20" y="180" width="120" height="24" rx="4" fill="#1a1a20" stroke="#333" stroke-width="1"/>
    <text x="30" y="196" fill="#666" font-family="system-ui" font-size="10">Password</text>
    
    <rect x="20" y="215" width="120" height="24" rx="4" fill="#1a1a20" stroke="#333" stroke-width="1"/>
    <text x="30" y="231" fill="#666" font-family="system-ui" font-size="10">http://url.com</text>
    
    <rect x="20" y="260" width="120" height="30" rx="4" fill="#FF1E27"/>
    <text x="80" y="280" fill="#fff" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">ADD USER</text>
</g>
</svg>`;

    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
