var cheerio = require("cheerio")
var request = require("request")

function Service(){};

Service.prototype.scrapeFromUrl = function(url,callback){
	request(url,function(error, response, html){
		if(error) return callback(error);
//		console.log(response);   	
		callback(null,cheerio.load(html),response);
	});
}

module.exports = new Service();
