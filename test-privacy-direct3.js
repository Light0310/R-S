import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/privacy', { waitUntil: 'networkidle0' });
  
  console.log("ROOT HTML: ", await page.evaluate(() => document.getElementById('root').innerHTML));
  
  await browser.close();
})();
