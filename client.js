const puppeteer = require("puppeteer");

(async function() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("console", msg => {
        if (msg) {
            const type = msg.type();
            console.log(`[${type}] ${msg.text()}`);
        }
    });
    await page.goto("http://localhost:4200");
})();
