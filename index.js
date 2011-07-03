require(__dirname + "/lib/dojo/dojo");


dojo.initDocument = function(html){

    var jsdom  = require("jsdom");
    window = jsdom.jsdom(html).createWindow();
    document = window.document;
    dojo.doc = document;
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
        window.location = {
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
