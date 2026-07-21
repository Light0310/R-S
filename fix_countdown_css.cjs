const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldCss = `    .countdown-timer-container {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      background: rgba(229, 9, 20, 0.08);
      border: 1px solid rgba(229, 9, 20, 0.2);
      border-radius: 12px;
      padding: 12px 24px;
      margin: 15px auto 25px auto;
      max-width: 320px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    .countdown-timer-title {
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #e50914;
      margin-bottom: 8px;
    }
    .countdown-timer {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .countdown-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 45px;
    }
    .countdown-number {
      font-family: var(--font-mono, "JetBrains Mono", monospace);
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1;
      background: rgba(26, 26, 26, 0.8);
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .countdown-label {
      font-size: 0.65rem;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 4px;
      font-weight: 600;
    }
    .countdown-separator {
      font-size: 1.25rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.3);
      margin-top: -15px;
    }`;

const newCss = `    .countdown-timer-container {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(135deg, rgba(20, 0, 0, 0.8) 0%, rgba(10, 0, 0, 0.95) 100%);
      border: 1px solid rgba(229, 9, 20, 0.4);
      border-radius: 16px;
      padding: 16px 30px;
      margin: 15px auto 25px auto;
      max-width: 360px;
      box-shadow: 0 0 25px rgba(229, 9, 20, 0.15), inset 0 0 15px rgba(229, 9, 20, 0.05);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }
    .countdown-timer-container::before {
      content: '';
      position: absolute;
      top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(to right, transparent, rgba(229, 9, 20, 0.1), transparent);
      transform: skewX(-25deg);
      animation: shine 4s infinite;
    }
    @keyframes shine {
      0% { left: -100%; }
      20% { left: 200%; }
      100% { left: 200%; }
    }
    .countdown-timer-title {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #ff3333;
      margin-bottom: 12px;
      text-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
    }
    .countdown-timer {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .countdown-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 50px;
    }
    .countdown-number {
      font-family: var(--font-mono, "JetBrains Mono", monospace);
      font-size: 1.75rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
      background: linear-gradient(180deg, #2a2a2a 0%, #111 100%);
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-bottom: 2px solid #e50914;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    .countdown-label {
      font-size: 0.65rem;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 6px;
      font-weight: 600;
      letter-spacing: 1px;
    }
    .countdown-separator {
      font-size: 1.5rem;
      font-weight: 800;
      color: #e50914;
      margin-top: -18px;
      animation: pulse-colon 1s infinite alternate;
    }
    @keyframes pulse-colon {
      0% { opacity: 0.3; text-shadow: none; }
      100% { opacity: 1; text-shadow: 0 0 10px rgba(229, 9, 20, 0.8); }
    }`;

content = content.replace(oldCss, newCss);
fs.writeFileSync('index.html', content, 'utf8');
console.log("Timer CSS fixed");
