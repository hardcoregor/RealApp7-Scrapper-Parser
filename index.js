const puppeteer = require('puppeteer');

// const url = '';


const GetItems = async (searchPage) => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await page.goto(`https://djinni.co/jobs/?keywords=react&all-keywords=&any-of-keywords=&exclude-keywords=&page=${searchPage}`);

  const itemList = await page.waitForSelector('div.d-flex.align-items-md-center.flex-column.flex-sm-row > div.list-jobs__title.list__title.order-1 > a')
    .then(() => page.evaluate(() => { 
      const ItemArray = [];
      const ItemNodeList = document.querySelectorAll('div.d-flex.align-items-md-center.flex-column.flex-sm-row > div.list-jobs__title.list__title.order-1 > a');
      ItemNodeList.forEach(item => {
        const href = item.href;
        ItemArray.push(item.href)
      })
      return ItemArray;
    }))
    .catch(() => console.log(`Selector Error`));

    console.log(itemList)
};

GetItems(4);