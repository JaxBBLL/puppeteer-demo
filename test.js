const puppeteer = require("puppeteer");
const HOST = "https://b2bwork.baidu.com";
const account = require("./account");
const { random } = require("./util");

// const iPhone6 = puppeteer.devices["iPhone 6"];

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
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.0 Safari/537.36"
  );
  await page.evaluateOnNewDocument(() => {
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    navigator.__proto__ = newProto;
  });
  // await page.emulate(iPhone6);
  await page.goto(`${HOST}`);
  await page.waitForTimeout(2000);
  const user = await page.$("#uc-common-account");
  await user.type(account.name, { delay: random(1, 2) * 50 });
  await page.mouse.move(random(1, 500), random(1, 500));
  await page.mouse.move(random(1, 500), random(1, 500));
  await page.mouse.up();
  await page.waitForTimeout(1000);
  const pwd = await page.$("#ucsl-password-edit");
  await pwd.type(account.pwd, { delay: random(1, 2) * 50 });
  const button = await page.$("#submit-form");
  await button.click();
  await page.waitForTimeout(3000);
  await page.screenshot({
    path: `dist/${Date.now()}.png`,
    fullPage: true,
  });
  await browser.close();
})();
