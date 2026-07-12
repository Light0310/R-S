import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/en/privacy', { waitUntil: 'networkidle0' });
  
  const h2Style = await page.evaluate(() => {
    const el = document.querySelector('h2');
    if (!el) return null;
    const computed = window.getComputedStyle(el);
    return {
      color: computed.color,
      backgroundColor: computed.backgroundColor
    };
  });
  console.log("H2 Style: ", h2Style);

  const bodyStyle = await page.evaluate(() => {
    const el = document.body;
    const computed = window.getComputedStyle(el);
    return {
      color: computed.color,
      backgroundColor: computed.backgroundColor
    };
  });
  console.log("Body Style: ", bodyStyle);
  
  await browser.close();
})();
