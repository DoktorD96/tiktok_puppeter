function SleepTime(sleep){
    return new Promise(function(resolve) {
        setTimeout(function(){resolve("true");}, sleep*1000);
    });
}
const puppeteer = require('puppeteer');
var browser = null; // global
async function dojob(){

browser = await puppeteer.launch({
	//ignoreDefaultArgs: false, // remove all args added
	ignoreDefaultArgs: ["--disable-extensions"],
	headless: false,
	userDataDir: "./proxy_data_save",
	ignoreHTTPSErrors: true,
	browserContext: "default",
	args: [
	  /*--user-data-dir=./proxy_data_save,*/
	  "--window-size=200,200",
	  '--disable-web-security',
      '--ignore-certificate-errors',
      '--disable-infobars',
	  '--disable-notifications',
      '--allow-insecure-localhost',
      '--disable-device-discovery-notifications',
	  '--allow-file-access-from-files',
	  '--media-cache-size=0',
	  '--disk-cache-size=0',
	  '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disable-gpu-shader-disk-cache',
	  '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      /*'--single-process',*/
      '--disable-gpu',
	  '--mute-audio',
	  '--proxy-server="direct://"',
	  '--proxy-bypass-list=*',
	  '--js-flags="--max-old-space-size=1024"',
	   "--disable-web-security",
 "-–allow-file-access-from-files",
 "--disable-site-isolation-trials",
 "--allow-file-access",
 "--allow-cross-origin-auth-prompt"
	  ]
	});
try{	


        const page = await browser.newPage();
		//await page.setRequestInterception(true);
		/*page.on('request', request => {
		  if (request.resourceType() === 'image'
		 || request.resourceType() === 'media')
			request.abort();
		  else
			request.continue();
		});*/
	    await page.setCookie({
         "domain":".tiktok.com",
         "expirationDate":2147483647,
         "hostOnly":false,
         "httpOnly":true,
         "name":"sessionid_ss",
         "path":"/",
         "sameSite":"no_restriction",
         "secure":true,
         "session":false,
         "storeId":"0",
         "value":"a2a8bf2c92d6834a2d27b2e46d75ac76"
		});
        await page.goto('https://www.tiktok.com/upload/?lang=en');
		await SleepTime(5);
		//const elementHandle = await page.$("input[type=file]");
		//await elementHandle.uploadFile('E:/python_testing/test.mp4');
		var futureFileChooser = page.waitForFileChooser();
// some button that triggers file selection
await page.click('div.upload-btn');
var fileChooser = await futureFileChooser;
await fileChooser.accept(['test.mp4']);
		
		
}catch(e){console.log(e);/*dojob();*/}


}



















// Needed Time to Wait For
function SleepTime(sleep){
    return new Promise(function(resolve) {
        setTimeout(function(){resolve("true");}, sleep*1000);
    });
}

dojob();




	
	




