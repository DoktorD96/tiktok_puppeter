
const config = {
	acc: {
		user: "poheyem@ucylu.com",
		pass: "freefacebook",
	},
	group:{
		id: "858210567861177"
	},
	github:{
		token: "c3aef396fec0acac808bbc2dc27f88dfb2e9401a",
		issueUrl: "https://github.com/groupkitapp/Web-Portal/issues"
	},
	pupconfig:{
		headless: false,
		args: [
		"--disable-notifications",
		]
	},
	output:{
		data: "{\"newd\":{\"awaitingapprovals\":2,\"groupid\":\"858210567861177\",\"groupname\":\"TEST2\",\"buttons\":{\"approveall\":1,\"approveindividual\":2},\"mambersdata\":[{\"userID\":\"100003166078927\",\"userName\":\"Dušan Ružić Ruža\",\"questions\":[{\"answer\":\"mrrobot@evilcorp.com\"},{\"answer\":\"YES\"},{\"answer\":\"Dummy text for testing purposes.\"}]},{\"userID\":\"100029798322950\",\"userName\":\"Dusan Gtesting\",\"questions\":[{\"answer\":\"dusan@groupkit.com\"},{\"answer\":\"YES\"},{\"answer\":\"Dummy input text test.\"}]}]},\"oldd\":{\"awaitingapprovals\":2,\"groupid\":\"858210567861177\",\"groupname\":\"TEST2\",\"buttons\":{\"approveall\":1,\"approveindividual\":2},\"mambersdata\":[{\"userID\":\"100003166078927\",\"userName\":\"Dušan Ružić Ruža\",\"questions\":[{\"answer\":\"mrrobot@evilcorp.com\"},{\"answer\":\"YES\"},{\"answer\":\"Dummy text for testing purposes.\"}]},{\"userID\":\"100029798322950\",\"userName\":\"Dusan Gtesting\",\"questions\":[{\"answer\":\"dusan@groupkit.com\"},{\"answer\":\"YES\"},{\"answer\":\"Dummy input text test.\"}]}]},\"mobile\":{\"name\":\"TEST2\",\"id\":\"858210567861177\"}}"
	}
}



const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


function loginFlow(page){
	return new Promise(async function(resolve){
		try{
		  const userfillold = await page.$("input[type='email']");
		  const userfill = await page.$("input[type='text']");
		  const passfill = await page.$("input[type='password']");
		  try{
		  await userfill.click({ clickCount: 3 });
		  }catch(e){}
		  try{
		  await passfill.click({ clickCount: 3 });
		  }catch(e){}
		  try{
		  await userfillold.click({ clickCount: 3 });
		  }catch(e){}
		  // clear data if there is some
		  try{
		  await userfill.type(config.acc.user);
		  }catch(e){}
		  try{
		  await userfillold.type(config.acc.user);
		  }catch(e){}
		  try{
		  await passfill.type(config.acc.pass);
		  }catch(e){}
		  const formSumbit = await page.$('form'); 
		  await formSumbit.evaluate(formSumbit => formSumbit.submit()); 
		  await page.waitForNavigation();
		  /* LOGIN END*/
		  resolve("true");
		}catch(e){
		  resolve("false");	
		}
	});
}

function callbackOnSucess(){
	return new Promise(async function(resolve){
		try{
			console.log("All OK");
			resolve("true");
		}catch(e){
			resolve("false");	
		}
	})
}

function callbackOnError(data){
	return new Promise(async function(resolve){
		try{
			console.log("NONE OK");
			resolve("true");
		}catch(e){
			resolve("false");	
		}
	})
}

function approvemembersPageOld(page){
	return new Promise(async function(resolve){
		try{
			await page.goto("https://www.facebook.com/groups/"+config.group.id+"/requests/",{waitUntil: 'networkidle2'});
			await page.waitFor(7000); // MUST HAVE 
			const content = await page.content();
			await page.goto("https://www.facebook.com/groups/"+config.group.id);
			const content1 = await page.content();
			var data = {};
			data.awaitingapprovals = bulkapprovalsNumber(content);
			data.groupid = groupuniqId(content1);
			data.groupname = groupName(content);
			data.buttons = buttonreplacementcheck(content);
			data.mambersdata = membersData(content);
			resolve(data);
		}catch(e){
			resolve("false");	
		}
	})
}

function fixUserUrl(data){
var nameslug = data.trim();
nameslug = nameslug.substring((parseInt(nameslug.indexOf("/user/")+6)));
nameslug = nameslug.substring(0,parseInt(nameslug.indexOf("/")));
return nameslug;	
}


function memberData($,data){
	var userdata = {};
	userdata.userID = "";
	userdata.userName = "";
	userdata.questions = [];
	/* old ui*/
	try{
		var infos = $($(data)).parents("li");
		if (infos.length != null && infos.length > 0) {
			userdata.userID = infos.find("a._z_3[uid]").attr("uid") || "ERROR";
			userdata.userName = infos.find("a._z_3[uid]").text() || "ERROR";
			userdata.questions = [];
			infos.find("div._4wsr>ul.uiList>li").each(function() {
				userdata.questions.push({
					answer: $(this).find("text").text()
				});
			});
		}
	}catch(e){}
	/* new ui*/
	try{
		var root_element = $(data).parents("div.a8nywdso.f10w8fjw.rz4wbd8a.pybr56ya").first();
		if (root_element != null && root_element.length > 0){
			var user = root_element.find("a[href^='/groups/'][role='link']:not([aria-label])").first();
			if (user != null && user.text() != null && user.text() != "") {
				userdata.userName = user.text().trim();
			}
			if (user != null && user.attr("href") != null && user.attr("href") != "") {
				try {
					var user_id = user.attr("href").toLowerCase().replace("https://www.facebook.com/", "");
					user_id = user_id.replace("https://www.beta.facebook.com/", "");
					userdata.userID = fixUserUrl(user_id);
				} catch (ex) {}
			}
			userdata.questions = [];
			var questinswrapper = root_element.find("ul li div.aahdfvyu span");
			if (questinswrapper != null &&
				questinswrapper.length != null &&
				parseInt(questinswrapper.length) > 0) {
				for (var i = 0, l = parseInt(questinswrapper.length); i < l; i++) {
					userdata.questions.push({
						answer: questinswrapper.eq(i).text()
					});
				}
			}
		}
	}catch(e){}
	return userdata;
}

function membersData(html){
	const $ = cheerio.load(html);
	var newbtns =  isNaN(parseInt($("div[aria-label='Approve']").length)) ? 0 : parseInt($("div[aria-label='Approve']").length);
	var oldbtns =  isNaN(parseInt($("button[name='approve']").length)) ? 0 : parseInt($("button[name='approve']").length);
	if (newbtns > 0){
		var btnarr = $("div[aria-label='Approve']");
		var users = [];
		for(var i = 0, l = parseInt($("div[aria-label='Approve']").length); i<l; i++){
			users.push(memberData($,btnarr[i]));
		}
		return users;
	}else if(oldbtns > 0){
		var btnarr = $("button[name='approve']");
		var users = [];
		for(var i = 0, l = parseInt($("button[name='approve']").length); i<l; i++){
			users.push(memberData($,btnarr[i]));
		}
		return users;
	}else{ return [];}
	return [];
}

function buttonreplacementcheck(html){
	const $ = cheerio.load(html);
var data = {};
data.approveall = 0;
data.approveindividual = 0;
/* old style */
try{
	data.approveall =  isNaN(parseInt($("button[name='approve_all']").length)) ? 0 : parseInt($("button[name='approve_all']").length);
}catch(e){}
try{
	data.approveindividual =  isNaN(parseInt($("button[name='approve']").length)) ? 0 : parseInt($("button[name='approve']").length);
}catch(e){}
if(parseInt(data.approveall) > 0 && parseInt(data.approveindividual) > 0){
	return data;
}
/* new style */
try{
	data.approveall = isNaN(parseInt($("div[aria-label='Approve All']").length)) ? 0 : parseInt($("div[aria-label='Approve All']").length);
}catch(e){}
try{
	data.approveindividual =  isNaN(parseInt($("div[aria-label='Approve']").length)) ? 0 : parseInt($("div[aria-label='Approve']").length);
}catch(e){}
return data;	
}

function groupName(html){
			const $ = cheerio.load(html);
            var groupname = "";
            try {
            groupname = $("#seo_h1_tag").text().trim();
            } catch (ex) {}
            try {
            if (groupname == "" ||
                    (groupname.length != null && groupname.length < 1) ||
                    (groupname != null && groupname.trim() == "")
                ) {
                    groupname = $("span[dir='auto'] div[style='display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;']>span").text().trim();
             }
            }catch(ex){}

            try {
                if (groupname == "" ||
                    (groupname.length != null && groupname.length < 1) ||
                    (groupname != null && groupname.trim() == "")
                ) {
                    groupname = $("title").text().trim();
                    if(groupname.substr(-11).toLowerCase() == " | facebook"){
                        groupname = groupname.substring(0, groupname.toLowerCase().lastIndexOf(" | facebook"));
                    } // remove | Facebook append
                    if(groupname.indexOf(")") > - 1){
                        groupname = groupname.substring(groupname.indexOf(")"));
                    } // remove notification prefix
                    
                }
            }catch(ex){} // group name based on title
            try {
                if (groupname == "" ||
                    (groupname.length != null && groupname.length < 1) ||
                    (groupname != null && groupname.trim() == "")
                ) {
                    groupname = $("div.j83agx80>div.qzhwtbm6>span.oi732d6d>div>span.oi732d6d:first").text().trim();
                }
            } catch (ex) {}
            try {
                if (groupname == "" ||
                    (groupname.length != null && groupname.length < 1) ||
                    (groupname != null && groupname.trim() == "")
                ) {
                    groupname = $("h3:first").text().trim();
                }
            } catch (ex) {}
			
			return groupname;
}





function groupuniqId(html){
	const $ = cheerio.load(html);
	var groupId = 0;
	try {
	if ($('meta[property="og:url"]').attr('content') != null &&
		$('meta[property="og:url"]').attr('content') != ''
	) {
		var data = $('meta[property="og:url"]').attr('content');
		var Array = data.split('/');
		Array = Array.filter(function(v) {
			return v !== ''
		});
		groupId = Array[Array.length - 1];
		return groupId;
	}
	} catch (ex) {}

	try {
	if (groupId == 0) {
		if ($('meta[property="al:ios:url"]').attr('content') != null &&
			$('meta[property="al:ios:url"]').attr('content') != ''
		) {
			var data = $('meta[property="al:ios:url"]').attr('content')
			if (data.indexOf('?id=') >= 0) {
				var txt = data.substring(0, data.indexOf("?id=")).length + '?id='.length;
				groupId = data.substring(txt);
				return groupId;
			}
		}
	}
	} catch (ex) {}

	try {
	if (groupId == 0) {
		if ($(htmlTag).filter('meta[property="al:android:url"]').attr('content') != null &&
			$(htmlTag).filter('meta[property="al:android:url"]').attr('content') != ''
		) {
			var data = $(htmlTag).filter('meta[property="al:android:url"]').attr('content')
			if (data.indexOf('fb://group/') >= 0) {
				var txt = data.substring(0, data.indexOf("fb://group/")).length + 'fb://group/'.length;
				groupId = data.substring(txt);
				return groupId;
			}
		}
	}
	} catch (ex) {}	
	return "0";
}


function bulkapprovalsNumber(html){
	const $ = cheerio.load(html);
	var uc = -1;
	try{
		uc = parseInt($("div._ohe.lfloat>div._4k1_._8o._8r>span._50f9._50f7").text());
	}catch(ex){}
	try {
		if( isNaN(uc) || uc < 1) {
		uc = parseInt($("span.d2edcug0.hpfvmrgz.qv66sw1b:first").text().replace(/,/gi, "").match(/\d+/)[0]);
		}
	} catch (ex) {}
	if ( isNaN(uc) || uc < 1) {
		try {
			uc = parseInt($("div._3qn7._61-3._2fyi._3qng>div._4k1_._3qn7._61-0._2fyh._3qnf>span._50f7").text().replace(/,/gi, "").match(/\d+/)[0]);
		} catch (ex) {}
	}
	if ( isNaN(uc) || uc < 1){
		try {
			uc = parseInt($("span.oi732d6d.ik7dh3pa.d2edcug0.qv66sw1b.c1et5uql.a5q79mjw.g1cxx5fr.knj5qynh.m9osqain").text().replace(/,/gi, "").match(/\d+/)[0]);
		} catch (ex) {}
	}
	if ( isNaN(uc) || uc < 1){
		try{
			uc = parseInt($("div.rq0escxv.l9j0dhe7 div.rq0escxv.l9j0dhe7 span.d2edcug0 span.d2edcug0 strong span").eq(3).text());
		}catch(ex){}
	}
	if ( isNaN(uc) || uc < 1){
		uc = -1;
	}
	return uc;
}

function mobileVersionData(html){
	const $ = cheerio.load(html);
	var group_id = 0;
	var name = "";
	try{
	if(name == "" && $("title").first() != null && $("title").first().length != null && parseInt($("title").first().length)> 0 && $("title").first().text() != ""){
			name = $("title").first().text();
		}
	}catch(e){}
	try {
		group_id = parseInt($("input[type='hidden'][name='target']").val());
	} catch (e) {}
	try {
		var links = $("a");
		if (!(parseInt(group_id) > 0) || isNaN(group_id)) {
			if (links != null && links.length != null && parseInt(links.length) > 0) {
				for (var i = 0, l = parseInt(links.length); i < l; i++) {
					if (
						links[i] != null &&
						links[i].attr("href") != null &&
						links[i].attr("href") != "" &&
						links[i].attr("href").trim() != "" &&
						links[i].attr("href").trim().indexOf("?group_id=") > -1
					) {
						output_link = new URLSearchParams(links[i].attr("href").trim().toLowerCase().substr(1)).get("group_id");
						if (output_link != null && output_link != "" && output_link.trim() != "" && parseInt(output_link.trim()) > 0) {
							group_id = parseInt(output_link.trim());
						}
					}
				}
			}
		}
	} catch (e) {}
	try {
		var forms = $("form");
		if (!(parseInt(group_id) > 0) || isNaN(group_id)) {
			if (forms != null && forms.length != null && parseInt(forms.length) > 0) {
				for (var i = 0, l = parseInt(forms.length); i < l; i++) {
					if (
						forms[i] != null &&
						forms[i].attr("action") != null &&
						forms[i].attr("action") != "" &&
						forms[i].attr("action").trim() != "" &&
						forms[i].attr("action").trim().indexOf("?group_id=") > -1
					) {
						output_link = new URLSearchParams(forms[i].attr("action").trim().toLowerCase().substr(forms[i].attr("action").trim().toLowerCase().indexOf("?"))).get("group_id");
						if (output_link != null && output_link != "" && output_link.trim() != "" && parseInt(output_link.trim()) > 0) {
							group_id = parseInt(output_link.trim());
						}
					}
				}
			}
		}
	} catch (e) {}
	group_id = group_id.toString().trim();
	var data = {};
	data.name  = name;
	data.id = group_id;
	return data;
}

function approvemembersPageNew(page){
	return new Promise(async function(resolve){
		try{
			await page.goto("https://www.facebook.com/groups/"+config.group.id+"/requests/",{waitUntil: 'networkidle2'});
			await page.waitFor(7000); // MUST HAVE 
			const content = await page.content();
			await page.goto("https://www.facebook.com/groups/"+config.group.id);
			const content1 = await page.content();
			var data = {};
			data.awaitingapprovals = bulkapprovalsNumber(content);
			data.groupid = groupuniqId(content1);
			data.groupname = groupName(content);
			data.buttons = buttonreplacementcheck(content);
			data.mambersdata = membersData(content);
			resolve(data);
		}catch(e){
			resolve("false");	
		}
	})
}

(async () => {
  /*INIT*/
  const browser = await puppeteer.launch(config.pupconfig);
  
  var check = false;
  var ERROR_TRY = 0;
  
  while(!check){
  var DATA = {};
  /*NEW LAYOUT*/
  var context = await browser.createIncognitoBrowserContext();
  var page = await context.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/200.0.3729.169 Safari/537.36');
  await page.setViewport({width: 1280, height: 800});
  await page.goto("https://www.facebook.com/");
  await page.content();
  await loginFlow(page);
  DATA.newd = await approvemembersPageNew(page);
  await context.close();
  /*OLD LAYOUT */
  var context = await browser.createIncognitoBrowserContext();
  var page = await context.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko');
  await page.setViewport({width: 1280, height: 800});
  await page.goto("https://www.facebook.com/");
  await page.content();
  await loginFlow(page);
  DATA.oldd = await approvemembersPageOld(page);
  await context.close();
  /*MOBILE VERSION GROUP ID AND TITLE FETCHING */
  var context = await browser.createIncognitoBrowserContext();
  var page = await context.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/200.0.3729.169 Safari/537.36');
  await page.setViewport({width: 1280, height: 800});
  await page.goto("https://mbasic.facebook.com/");
  await page.content();
  await loginFlow(page);
  await page.goto("https://mbasic.facebook.com/groups/" + config.group.id);
  const content = await page.content();
  await context.close();
  DATA.mobile = mobileVersionData(content);
  check = config.output.data == JSON.stringify(DATA);
  if(!check){
	  ERROR_TRY++;
	  if(ERROR_TRY > 2){
		 callbackOnError(JSON.stringify(DATA));
		 break;
	  }
  }else{
	  callbackOnSucess();
	break;
  }
  }
  await browser.close();
  
})();

