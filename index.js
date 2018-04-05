var service = require("./service");
var async = require("async");

console.log("----------- Mobile List fetching ------");
async.parallel([function(callback){
	service.scrapeFromUrl(`https\:\/\/www.flipkart.com\/search?q=mobile&sid=tyy\/4io&as=on&as-show=on&otracker=start&as-pos=1_1_ic_mobil`,function(err,data){
	if(err) return callback(err);
	var $ = data;
	var dataObj = { source :"Flipkart",productArray : []};
	$("body").find('._2-gKeQ').each(function(){
		var productName = $(this).find("._3wU53n").text();
		var productPrice = $(this).find("._1vC4OE").text();
		dataObj.productArray.push({
			productName , productPrice , 
			});

	});
	callback(null,dataObj);
	})
	}
	,function(callback){
		service.scrapeFromUrl("https\:\/\/www.amazon.in/mobile-phones/b?ie=UTF8&node=1389401031",function(err,data){
	if(err) return callback(err);
	var $ = data;
	var dataObj = { source :"Amazon",productArray : []};
	$("body").find('li.s-result-item').each(function(){
		var productName = $(this).find("h2.s-access-title").text();
		var productPrice = $(this).find("span.s-price").text().trim();
		dataObj.productArray.push({
			productName , productPrice , 
			});

	});
	callback(null,dataObj);
	})
	},
	function(callback){
		service.scrapeFromUrl("https\:\/\/www.ebay.in/deals/electronics/mobile-phones",function(err,data){
 if(err) return callback(err);
        var $ = data;
        var dataObj = { source :"Ebay",productArray : []};
	
        $("body").find("div.col").each(function(){
                var productName = $(this).find("span.ebayui-ellipsis-2").text();
                var productPrice = $(this).find("span.first").text();
                dataObj.productArray.push({
                        productName , productPrice , 
                        });

        });
        callback(null,dataObj);
        })

	}
	],function(err,done){
	if(err)
		console.error(err);
	console.log(JSON.stringify(done,0,4))
})
