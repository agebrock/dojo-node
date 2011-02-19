var jsdom = require("./jsdom/jsdom");
var xhr = require("./XMLHttpRequest").XMLHttpRequest;

exports.jsdom = jsdom;
exports.setWindow = function(xmlsource){
    XMLHttpRequest = xhr;
    navigator = {};
    document = {};
    window = jsdom.jsdom(xmlsource).createWindow();
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
        "pathname": "/",
        "host": "myhost",
        "hostname": "www.myhost.de",
        "port": "",
        "search": "",
        "hash": "",
        "href": "http://www.myhost.de/",
        "protocol": "http:"
    };

    window.XMLHttpRequest = XMLHttpRequest;
    return window;
}
exports.deleteGlobals = function(){
    delete window;
    delete navigator;
    delete XMLHttpRequest;
    delete document;
}
