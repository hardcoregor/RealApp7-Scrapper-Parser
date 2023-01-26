const puppeteer = require('puppeteer');
const fs = require('fs');

const linkWithFiltersVacancies = 'https://djinni.co/jobs/?keywords=react&all-keywords=&any-of-keywords=&exclude-keywords=&exp_level=2y'; // LINK TO INTEREST VACANCIES FILTERS

(async () => {
  let items = [];
  let checker;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
  });
  const page = await browser.newPage();

  await page.goto(linkWithFiltersVacancies);

  const is_disabled = await page.$('li:last-child.page-item.disabled') !== null;
  checker = is_disabled;

  //-----------------------------------------------------------------------------------PARSE PAGES-----------------------------------------------------------------------------
  while (!checker) {
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

    const is_disabled = await page.$('li:last-child.page-item.disabled') !== null;
    checker = is_disabled;

    await page.waitForTimeout(random)
  }
  //-----------------------------------------------------------------------------------PARSE PAGES-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------SAVE RESULT TO JSON-----------------------------------------------------------------------------
  let result = JSON.stringify(items);

  fs.writeFile('vacanciesResult.json', result, function (err) {
    if (err) {
      console.log(err);
    }
  })
  //-----------------------------------------------------------------------------------SAVE RESULT TO JSON-----------------------------------------------------------------------------

  await browser.close()
})()