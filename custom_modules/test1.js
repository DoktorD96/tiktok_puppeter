const puppeteer = require('puppeteer');
(async () => {
	try {
        //const browser = await puppeteer.launch();
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({args: ["--proxy-server='direct://'", '--proxy-bypass-list=*']})
        const page = await browser.newPage();
        page.on('error', async function(err) {
            console.log('Page load error!');
        });
		await page.setDefaultNavigationTimeout(0); 
        await page.goto('http://www.knjizevnicasopis.com/');
		await page.screenshot({path: 'test.png'});
        await browser.close();
		console.log("done!");
    }catch(err){
		console.log("Catched error!");
		console.log(err);
		await browser.close();
    }
})();