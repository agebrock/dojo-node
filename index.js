require(__dirname + "/lib/dojo/dojo");
dojo.debug = false;
dojo.initDocument = function(html){

    var jsdom  = require("jsdom");
    
    
    jsdom.defaultDocumentFeatures = {
      FetchExternalResources   :  ["script"], 
      ProcessExternalResources : ["script"],
      "MutationEvents"           : '2.0',
      "QuerySelector"            : false
    }
    window = jsdom.jsdom(html).createWindow();
    document = dojo.doc = window.document;
    window.navigator = {
            "language": "DE_de",
            "product": "Gecko",
            "appVersion": "5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Chrome/9.0.570.1 Safari/534.11",
            "onLine": true,
            "platform": "Linux x86_64",
            "vendor": "Google Inc.",
            "appCodeName": "Mozilla",
            "cookieEnabled": true,
            "appName": "Netscape",
            "productSub": "20030107",
            "userAgent": "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Chrome/9.0.570.1 Safari/534.11",
            "vendorSub": ""
        };
     location = window.location = {
            "href": "http://www.myhost.de/",
            "origin": "http://www.myhost.de",
            "host": "myhost",
            "hostname": "www.myhost.de",
            "port": "",
            "search": "",
            "hash": "",
            "protocol": "http:"
        };
    navigator = window.navigator;
    
}

module.exports = {dojo:dojo,dijit:dijit,dojox:dojox};
