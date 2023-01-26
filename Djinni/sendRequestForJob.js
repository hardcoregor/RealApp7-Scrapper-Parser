const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs').promises;
const { executablePath } = require('puppeteer');
require('dotenv').config()

const jsonData = require('./vacanciesResult.json');



(async () => {
  const random = ((Math.floor((Math.random() * 10)) * (Math.random() * 2)) + 1) * 500;
  const values = Object.values(jsonData);

  let arrayLinksForScrap = [values[0][0]];
  let items = [];
  let logged;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
    executablePath: executablePath()
  });
  const page = await browser.newPage();

  //---------------------------------------------------------LOGIN-----------------------------------------------------------------------------
  // await page.goto('https://djinni.co/login?from=frontpage_main');
  // if (await page.$('#email') !== null) {
  //   logged = true;
  // } else logged = false;

  // if (logged) {
  //   await page.type('#email', process.env.ACCOUNT, { delay: (Math.floor((Math.random() * 10))) * 30 })
  //   await page.waitForTimeout(random)
  //   await page.type('#password', process.env.PASSWORD, { delay: (Math.floor((Math.random() * 10))) * 54 })
  //   await page.waitForTimeout(random)
  //   await page.click('button')
  // }
  // console.log('logged')
  //---------------------------------------------------------LOGIN-----------------------------------------------------------------------------

  //---------------------------------------------------------SAVE COOKIES----------------------------------------------------------------------
  // const cookies = await page.cookies();
  // fs.writeFile('cookies.json', JSON.stringify(cookies, null, 2), function (err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });

  // await page.waitForTimeout(random)
  //---------------------------------------------------------SAVE COOKIES-----------------------------------------------------------------------

  //---------------------------------------------------------SETUP COOKIES----------------------------------------------------------------------
  // const cookiesString = await fs.readFile('./cookies.json')
  // const cookiesSet = JSON.parse(cookiesString);
  // await page.setCookie(...cookiesSet)
  //---------------------------------------------------------SETUP COOKIES----------------------------------------------------------------------

  //---------------------------------------------------------GENERATE ARRAY FOR RESPOND---------------------------------------------------------
  values.forEach((eachArray) => {
    eachArray.forEach((linkVacancy) => {
      arrayLinksForScrap.push(linkVacancy)
    })
  })
  arrayLinksForScrap.shift(); // BECAUSE WHEN CREATE ARRAY ADD FIRST ELEMENT
  //---------------------------------------------------------GENERATE ARRAY FOR RESPOND---------------------------------------------------------

  //---------------------------------------------------------RESPOND CYCLE----------------------------------------------------------------------
  while (arrayLinksForScrap.length > 0) {

    const random = ((Math.floor((Math.random() * 10)) * (Math.random() * 2)) + 1) * 1000;

    //--------------------------------------------FIRST STEP GO TO VACANCIE PAGE-----------------------------------------------------------------
    await page.goto(arrayLinksForScrap[0]);
    console.log(`1. transition to page done ${arrayLinksForScrap[0]}`)
    await page.waitForTimeout(random)
    //--------------------------------------------FIRST STEP GO TO VACANCIE PAGE-----------------------------------------------------------------


    //---------------------------------------------ADDITIONAL FUNCTION FOR SAVE SITE COMPANY----------------------------------------------------
    // await page.waitForSelector('body > div.wrapper > div.container.job-post-page > div:nth-child(2) > div.col-sm-8.row-mobile-order-2 > div > a', { visible: true })

    // const url = await page.evaluate(() => {
    //   const site = document.querySelector('body > div.wrapper > div.container.job-post-page > div:nth-child(2) > div.col-sm-8.row-mobile-order-2 > div > a').href
    //   return site;
    // })

    // items.push(url);
    // console.log('2. Adding company site done')
    // await page.waitForTimeout(random)
    //---------------------------------------------ADDITIONAL FUNCTION FOR SAVE SITE COMPANY----------------------------------------------------

    //---------------------------------------------SECOND STEP CLICK TO BUTTON RESPOND----------------------------------------------------------
    await page.waitForSelector('div.row > div > div > div > button', { visible: true })
    await page.click('div.row > div > div > div > button')
    console.log('2. click respond')
    await page.waitForTimeout(random)
    //---------------------------------------------SECOND STEP CLICK TO BUTTON RESPOND----------------------------------------------------------


    //---------------------------------------------THIRD STEP PUT COVER LETTER------------------------------------------------------------------
    await page.waitForSelector('#tr_432822 > td.js-template-put', { visible: true })
    await page.click('#tr_432822 > td.js-template-put')
    console.log('3. Put text done')
    await page.waitForTimeout(random)
    //---------------------------------------------THIRD STEP PUT COVER LETTER------------------------------------------------------------------

    //---------------------------------------------FOURTH STEP SEND APPLY-----------------------------------------------------------------------
    await page.click('#job_apply')
    console.log('4. Respond done!')
    arrayLinksForScrap.shift();
    await page.waitForTimeout(random)
    //---------------------------------------------FOURTH STEP SEND APPLY-----------------------------------------------------------------------

    //---------------------------------------------REFRESH JSON WITH CONSIDERING SHIFT----------------------------------------------------------
    let result = JSON.stringify(arrayLinksForScrap);

    fs.writeFile('vacanciesResult.json', result, function (err) {
      if (err) {
        console.log(err);
      }
    })

    await page.waitForTimeout(random)
    console.log('5. REFRESH JSON!')
    //---------------------------------------------REFRESH JSON WITH CONSIDERING SHIFT----------------------------------------------------------

  }
  //---------------------------------------------------------RESPOND CYCLE----------------------------------------------------------------------

  // await browser.close()
})()