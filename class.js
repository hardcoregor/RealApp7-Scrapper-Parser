const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
  });
  const page = await browser.newPage();

  await page.goto('https://www.amazon.com/s?i=computers-intl-ship&rh=n%3A16225007011&fs=true&page=400&qid=1674517831&ref=sr_pg_400', {
    // await page.goto('https://djinni.co/jobs/?keywords=react&all-keywords=&any-of-keywords=&exclude-keywords=&page=30', { //DJINI
    waitUntil: 'load'
  });

  // const is_disabled = await page.$('.page-item.disabled') !== null; //DJINI
  const is_disabled = (await page.$$('.s-pagination-item.s-pagination-next.s-pagination-disabled')).length;

  const result = is_disabled > 0 ? false : true;

  console.log(is_disabled);
  console.log(result);
})();