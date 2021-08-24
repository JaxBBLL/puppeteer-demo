const puppeteer = require("puppeteer");

const keywords = ["夹克", "猫头鹰", "芋头", "鼠标", "键盘"];
let index = 0;

(async () => {
  const browser = await puppeteer.launch({
    devtools: true,
    // headless: true,
    args: ["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.0 Safari/537.36"
  );

  go();

  async function go() {
    const keyword = keywords[index];
    if (!keyword) {
      // await browser.close();
      return;
    }
    await page.goto("https://www.baidu.com");
    // await page.evaluate(async () => {
    //   localStorage && localStorage.clear();
    // });
    const cookies = await page.cookies();
    for (let i = 0; i < cookies.length; i++) {
      await page.deleteCookie({
        name: cookies[i].name,
      });
    }
    const oInput = await page.$("#kw");
    await oInput.focus();
    await oInput.type(keyword, { delay: random(5, 10) * 100 });
    await oInput.press("Enter");
    await page.waitForNavigation({
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `dist/${keyword}.png`,
      fullPage: true,
    });

    index++;
    go();
  }
})();

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
