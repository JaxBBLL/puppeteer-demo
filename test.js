const puppeteer = require("puppeteer");
const config = require("./config");

const HOST = "http:www.qq.com";

(async () => {
  const browser = await puppeteer.launch({
    devtools: true,
    // headless: false,
    defaultViewport: null,
    // executablePath: config.browserPath.chrome,
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--start-maximized",
    ],
  });
  const page = (await browser.pages())[0];
  await page.goto(`${HOST}`);
  await page.waitForTimeout(1000);
})();
