const puppeteer = require('puppeteer');
const T = require('./custom_modules/tiktok_modules.js');
const path = require('path');
const fs = require('fs');
var browser = null; // global
var jcode = fs.readFileSync('./configdata/jquery.js', 'utf8');
async function dojob(){
browser = await puppeteer.launch(T.pup_config);
try{	
    const page = await browser.newPage();
    await page.goto('about:blank');
	await page.evaluate(({jcode}) =>{
        var jq = document.createElement("script");
		jq.type = "text/javascript";
		jq.text = jcode;
        document.getElementsByTagName("head")[0].appendChild(jq);
		
		var jq = document.createElement("script");
		jq.type = "text/javascript";
		jq.text = `
		var numberglobal = 0;
		var authors = [];
		var limit = 3;
		function callback(){
			authors = [...new Set(authors)];
			var jq1 = document.createElement("script");
			jq1.type = "text/javascript";
			jq1.id = "outputdata";
			jq1.text = JSON.stringify(authors);
			document.getElementsByTagName("head")[0].appendChild(jq1);
		}
		
		
		function tiktokallusers(url){
        $.ajax({
			type: "GET",
			url: url,
			dataType: 'json',
			xhrFields: { withCredentials:false },
			headers: {          
			Accept: "*/*"
			},
			success: function (data){debugger;
				limit = 0;
				if(data.statusMsg != null){
					limit++
					if(limit>3){
						callback();
						return false;
					}
					 tiktokallusers("https://m.tiktok.com/api/challenge/item_list/?aid=1988&challengeID=42164&count=30&cursor="+numberglobal);
					 return false;
				 }
				 if(data.hasMore == true){
					try{
							 var array = data.itemList;
							 for(var i = 0, l = array.length; i<l; i++){
								 authors.push(array[i].author.id.toLowerCase().trim());
							 }
					}catch(e){}
					numberglobal = numberglobal + 30;
					tiktokallusers("https://m.tiktok.com/api/challenge/item_list/?aid=1988&challengeID=42164&count=30&cursor="+numberglobal);
				 }else{
					callback();
					return false;
				 }
			},
			error: function (data){
				limit++
				if(limit>3){
					callback();
					return false;
				}
                tiktokallusers("https://m.tiktok.com/api/challenge/item_list/?aid=1988&challengeID=42164&count=30&cursor="+numberglobal);
			}
		});
		}
		tiktokallusers("https://m.tiktok.com/api/challenge/item_list/?aid=1988&challengeID=42164&count=30&cursor="+numberglobal);
		`;
        document.getElementsByTagName("head")[0].appendChild(jq);
    },{jcode});
	
	var allAccounts = await page.waitForSelector('#outputdata', {
        timeout: 20*60*1000
	});
	const inner_html = await page.$eval('#outputdata', element => element.innerHTML);
	console.log(inner_html);
	
}catch(e){T.log(e);}
}
dojob();

path.resolve(__dirname, './')




	
	




