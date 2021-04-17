var m = {};
m.logdata = false;
m.pup_config = {
	//ignoreDefaultArgs: false, // remove all args added
	ignoreDefaultArgs: ["--disable-extensions"],
	headless: false,
	userDataDir: "./proxy_data_save",
	ignoreHTTPSErrors: true,
	browserContext: "default",
	devtools: true, //debugger;
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
	  '--disable-web-security',
	  '--allow-file-access-from-files',
	  '--disable-site-isolation-trials',
	  '--allow-file-access',
	  '--allow-cross-origin-auth-prompt'
	  ]
};
m.log = function(data){
	if(m.logdata){
		console.log(data);
	}
}
m.sleep = function(sleep){
    return new Promise(function(resolve) {
        setTimeout(function(){resolve("true");}, sleep*1000);
    });
}
module.exports = m;