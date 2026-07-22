const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldCss = `    .feature-card {
       /* gray-800 */
      padding: 40px 30px;
      border-radius: 12px;
      position: relative;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .feature-card:hover {  transform: translateY(-5px);  box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 15px rgba(255,0,0,0.1);  border-color: rgba(255,0,0,0.3); }

    .feature-icon-wrapper {
      width: 48px;
      height: 48px;
      background-color: var(--color-primary);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      color: var(--color-text-white);
      box-shadow: 0 0 15px rgba(229, 9, 20, 0.3);
    }

    .feature-icon-wrapper svg {
      width: 24px;
      height: 24px;
      stroke: currentColor;
    }`;

const newCss = `    .feature-card {
      padding: 40px 30px;
      border-radius: 12px;
      position: relative;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .feature-card:hover {  transform: translateY(-5px);  box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 15px rgba(255,0,0,0.1);  border-color: rgba(255,0,0,0.3); }

    .feature-icon-wrapper {
      width: 56px;
      height: 56px;
      background-color: var(--color-primary);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px auto;
      color: var(--color-text-white);
      box-shadow: 0 10px 25px -5px rgba(229, 9, 20, 0.5);
    }

    .feature-icon-wrapper svg {
      width: 28px;
      height: 28px;
      stroke: currentColor;
    }`;

content = content.replace(oldCss, newCss);
fs.writeFileSync('index.html', content, 'utf8');
console.log("Features CSS fixed");
