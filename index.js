const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
  });
  const page = await browser.newPage();

  // await page.goto('https://www.amazon.com/s?rh=n%3A16225007011&fs=true&ref=lp_16225007011_sar');
  await page.goto('https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cn%3A1292110011%2Cp_72%3A1248879011%2Cp_36%3A1253507011&dc&qid=1674582231&rnid=386442011&ref=sr_nr_p_36_5&ds=v1%3ApjdwSBELL3%2BCISoDEimEAZVykwrZynk4H1Uc3qM0t6Y');
  // await page.goto('https://djinni.co/jobs/?keywords=react&all-keywords=&any-of-keywords=&exclude-keywords='); //DJINI

  const productsHandles = await page.$$('div.s-main-slot.s-result-list.s-search-results.sg-row>.s-result-item');
  // const productsHandles = await page.$$('div.col-sm-8.row-mobile-order-2'); // DJINI

  let i = 0;
  let items = [];
  let isBtnDisabled = false;

  while (!isBtnDisabled) {

    //////////////////////////////////////////////////////////////////////////ONE PAGE PARSE////////////////////////////////////////////////////////////////////////////////////////////////////
    for (const producthandle of productsHandles) {

      let title = "Null";
      let price = "Null";
      let img = "Null";

      try {
        title = await page.evaluate(el => el.querySelector('h2 > a > span').textContent, producthandle);
        // const title = await page.evaluate(el => el.querySelector('.profile').href, producthandle) // DJINI
      } catch (error) { }

      try {
        price = await page.evaluate(el => el.querySelector('.a-price > .a-offscreen').textContent, producthandle);
      } catch (error) { }

      try {
        img = await page.evaluate(el => el.querySelector('.s-image').getAttribute("src"), producthandle);
      } catch (error) { }


      if (title !== 'Null') {
        items.push({ title, price, img })
      }
    }
    //////////////////////////////////////////////////////////////////////////ONE PAGE PARSE////////////////////////////////////////////////////////////////////////////////////////////////////

    await page.waitForSelector('.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator', { visible: true })
    const is_disabled = (await page.$$('.s-pagination-item.s-pagination-next.s-pagination-disabled')).length;
    const boolDisabled = is_disabled > 0 ? false : true;
    isBtnDisabled = boolDisabled;

    if (isBtnDisabled) {
      await page.click('.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator')
    }
  }



  console.log(items)
})()