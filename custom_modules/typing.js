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
		await SleepTime(10);
		var elementHandle = await page.$("div[data-contents='true']");
		await elementHandle.click();
		await elementHandle.click();
		await elementHandle.type("Author: ");
		await SleepTime(10);
		elementHandle = await page.$("div.icon-style.at");
		elementHandle.click();
		await SleepTime(10);
		elementHandle = await page.$("input.search-friends");
		await elementHandle.click();
		await SleepTime(10);
		await elementHandle.type("@spencer");
		await SleepTime(10);
		await page.evaluate(function (){
var array = document.querySelectorAll("div.user-id");
for(var i = 0, l = array.length; i<l; i++){
if(array[i].innerText.toLowerCase().trim() == "@spencerrking"){
//array[i].click();
}
}
});
await SleepTime(10);
//elementHandle = await page.$("img.close-icon");
		//sawait elementHandle.click();
		
		elementHandle = await page.$("div[data-contents='true']");
		await elementHandle.click();
		await elementHandle.type(String.fromCharCode(13));
		await elementHandle.type("#test1");
		await SleepTime(5);
		await elementHandle.type(String.fromCharCode(13));
		await elementHandle.click();
		await elementHandle.click();
		await elementHandle.type("#test2");
		await SleepTime(5);
		await elementHandle.type(String.fromCharCode(13));
		await elementHandle.click();
		await elementHandle.click();
		await elementHandle.type("#test3");
		await SleepTime(5);
		await elementHandle.type(String.fromCharCode(13));
		await elementHandle.click();
		
		
		// search-friends
		
		// await page.keyboard.down('Enter');
		
		// div.icon-style.at
		// img.close-icon
		// div.@xttq
		
		// const elementHandle = await page.$("div[data-contents='true']");
		// await elementHandle.click();
		// //await elementHandle.type(String.fromCharCode(13));
		// //await elementHandle.click();
		// //await elementHandle.type(String.fromCharCode(13));
		// await elementHandle.type("@test");
		// await SleepTime(15);
		// await elementHandle.type(String.fromCharCode(13));
		// await elementHandle.click();
		// await elementHandle.type(String.fromCharCode(13));
		// await elementHandle.click();
		// await elementHandle.type("#test");
		// await SleepTime(5);
		// await elementHandle.type(String.fromCharCode(13));
		// await elementHandle.click();
		// await elementHandle.type(String.fromCharCode(13));
		// await elementHandle.click();
		// await elementHandle.type("@test");
		// await SleepTime(5);
		// await elementHandle.type(String.fromCharCode(13));
		// await elementHandle.click();
		// await elementHandle.type(String.fromCharCode(13));
		// await elementHandle.click();
		// await elementHandle.type("#test");
		// await SleepTime(5);
		// await elementHandle.type(String.fromCharCode(13));
		// await elementHandle.click();
		// await elementHandle.type(String.fromCharCode(13));
		// await elementHandle.click();
		
		
		// await page.evaluate(function (){
// var array = document.querySelectorAll("div.user-id");
// for(var i = 0, l = array.length; i<l; i++){
// if(array[i].innerText.toLowerCase().trim() == "@spencerrking"){
// array[i].click();
// }
// }

//});
}catch(e){console.log(e);/*dojob();*/}
}



















// Needed Time to Wait For
function SleepTime(sleep){
    return new Promise(function(resolve) {
        setTimeout(function(){resolve("true");}, sleep*1000);
    });
}

dojob();




	
	




