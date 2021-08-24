const puppeteer = require("puppeteer");

const HOST = "http://member.y24.kucdn.cn";

(async () => {
  const browser = await puppeteer.launch({
    // devtools: true,
    headless: false,
    defaultViewport: null,
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--start-maximized",
    ],
  });
  const page = (await browser.pages())[0];
  await page.goto(`${HOST}/biz/#/home`);
  await page.setCookie({
    name: "ZSSESSIONID",
    value: "fd67606e-2405-41ab-9a43-ec00f07921fd",
  });
  await page.waitForTimeout(1000);
  await page.goto(`${HOST}/biz/#/goods/management/goods_list`);
  await page.waitForTimeout(1000);
  await page.goto(`${HOST}/biz/#/goods/management/release_goods`);
})();
