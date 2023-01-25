const puppeteer = require('puppeteer');
const fs = require('fs');

const jsonData = require('../vacanciesResult.json');

(async () => {
  let items = [];
  let arrayLinksForScrap = []
  let start = 0;
  let end = 2;

  const values = Object.values(jsonData)

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
  });
  const page = await browser.newPage();

  const res = values.forEach(async (eachArray) => {
    eachArray.forEach(async (linkVacancy) => {
      arrayLinksForScrap.push(linkVacancy)
    })
  })

  while (arrayLinksForScrap.length > 0) {
    await page.goto(arrayLinksForScrap[0]);
    arrayLinksForScrap.shift();

    await page.waitForSelector('body > div.wrapper > div.container.job-post-page > div:nth-child(2) > div.col-sm-8.row-mobile-order-2 > div > a', { visible: true })
    const url = await page.evaluate(() => {
      const site = document.querySelector('body > div.wrapper > div.container.job-post-page > div:nth-child(2) > div.col-sm-8.row-mobile-order-2 > div > a').href
      return site;
    })

    items.push(url);

    const random = ((Math.floor((Math.random() * 10)) * (Math.random() * 2)) + 1) * 500;
    await page.waitForTimeout(random)
  }

  await browser.close()
})()