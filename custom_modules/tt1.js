
const endpoints =[
"https://api19-normal-c-alisg.tiktokv.com/",
"https://api16-normal-c-alisg.tiktokv.com/",
"https://api9-normal-c-alisg.tiktokv.com/",
"https://api3-normal-c-alisg.tiktokv.com/"
];

//https://m.tiktok.com/api/item_list/?count=5&id=6918723217915331590&maxCursor=0&minCursor=0&sourceType=8

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
//var CC = await getCountryCode();		
//if(CC == "GB"){
//	// do our job
//}

var vpn = "chrome-extension://oofgbpoabipfcfjapgnbbjjaenockbdp/popup.html";
const page = await browser.newPage();
await page.goto(vpn);
await SleepTime(10);
await page.click("div.server-item[id='0gb']");
//await page.evaluate(() => { document.querySelector("#\30 gb")[1].click(); });

//await browser.close();
}catch(e){console.log(e);/*dojob();*/}

//connected-disconnect-button

div.server-item[id='0gb']
div.server-item[id='0gb']

0us

0de

0ca

serverkey="ca"


// recover from crash
browser.on('disconnected', async function(){
    /*dojob();*/
});





















// Needed Time to Wait For
function SleepTime(sleep){
    return new Promise(function(resolve) {
        setTimeout(function(){resolve("true");}, sleep*1000);
    });
}
// Get CODE from All API combined
async function getCountryCode(){
	return new Promise(async function(resolve){
	try{
	var ipApiList = [
		"https://ipapi.co/country/",
		"http://ipwhois.app/line/?objects=country_code",
		"http://ip-api.com/csv/?fields=countryCode",
		"https://api.ipdata.co/?api-key=d8a398ba1889bf61e22bc2dcdd3913f90825d7261c600f614001d578",
		"https://www.iplocate.io/api/lookup/",
		"https://api.ipregistry.co/?key=elr9m4ftztfhz8&fields=location.country.code"
		];
	for(var i = 0, l = ipApiList.length; i<l; i++){
	var countryCode = await checkCountryCode(ipApiList[i]);
		if(countryCode != null && countryCode.trim() != "" && countryCode.trim().length < 5){
			resolve(countryCode);
			return false;
			break;
		}
	}
	resolve("");
	return false;
	}catch(e){
		resolve("");
		/*dojob();*/
		console.log(e);
		return false;	
	}
	});
}

//check page IP
function checkCountryCode(url){
    return new Promise(async function(resolve){
		try{
		 const context = await browser.createIncognitoBrowserContext();
		 const page = await context.newPage();
		 page.setDefaultNavigationTimeout(3000)
		 await page.goto(url);
		 const result = await page.evaluate(body => body.innerText, await page.$('body'));
		 try{
					var datas = JSON.parse(result.trim());
					if(datas != null && datas.country_code != null && datas.country_code.trim() != ""){
						resolve(datas.country_code.trim().toUpperCase());
						await page.close();
						return false;
					}
					if(datas != null
					&& datas.location != null 
					&& datas.location.country != null
					&& datas.location.country.code != null
					&& datas.location.country.code.trim() != ""){
						resolve(datas.location.country.code.trim().toUpperCase());
						await page.close();
						return false;
					}
					resolve("");
					await page.close();
					return false;
		}catch(e){
			resolve(result.trim().toUpperCase());
			await page.close();
			return false;
		}
		page.on('error', async function(err) {
			
            resolve("");
			await page.close();
			return false;
        });
		}catch(e){
			resolve("");
			/*dojob();*/
			console.log(e);
			return false;
		}
    });
}


}
dojob();




	
	




