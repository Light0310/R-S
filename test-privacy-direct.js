import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/privacy', { waitUntil: 'networkidle0' });
  
  const content = await page.content();
  console.log("BODY TEXT: ", await page.evaluate(() => document.body.innerText));
  
  await browser.close();
})();
