const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  let items = [];
  let start = 0;
  let end = 2;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
  });
  const page = await browser.newPage();

  await page.goto('https://djinni.co/jobs/?keywords=react&all-keywords=&any-of-keywords=&exclude-keywords=&page=');

  while (start <= end) {
    const vacanciesData = await page.evaluate(() => {
      const vacancies = Array.from(document.querySelectorAll('div.list-jobs__title.list__title'))
      const data = vacancies.map(vacancy => (vacancy.querySelector('a.profile').href
      ))
      return data;
    })

    items.push(vacanciesData);

    const random = ((Math.floor((Math.random() * 10)) * (Math.random() * 2)) + 1) * 1000;

    await page.waitForSelector('body > div.wrapper > div.container > div.row > div.col-sm-8.row-mobile-order-2 > ul.pagination.pagination_with_numbers > li:last-child > a', { visible: true })

    await page.click('body > div.wrapper > div.container > div.row > div.col-sm-8.row-mobile-order-2 > ul.pagination.pagination_with_numbers > li:last-child > a')

    await page.waitForTimeout(random)

    start++
  }

  let result = JSON.stringify(items);

  fs.writeFile('vacanciesResult.json', result, function (err) {
    if (err) {
      console.log(err);
    }
  })

  await browser.close()

  // for (const producthandle of productsHandles) {
  //   console.log(producthandle)
  //   let title = "Null";

  //   try {
  //     title = await page.evaluate(el => el.querySelector('.profile').href, producthandle) // DJINI
  //   } catch (error) { }

  //   if (title !== 'Null') {
  //     items.push(title)
  //   }
  // }

  // console.log(items)
})()