var jsdom  = require("jsdom");
var  HTML5 = require('html5'),
    Script = process.binding('evals').Script,
    sys = require('sys'),
    fs = require('fs')
    r = require("request")
    url = require("url");




navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/15.0.849.0 Safari/535.1",
    cookieEnabled: true,
    language: "en-US",
    onLine: true,
    platform: "Linux i686",
    product: "Gecko",
    productSub: "20030107",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/15.0.849.0 Safari/535.1",
    vendor: "Google Inc.",
    vendorSub: ""
};



location =  {
        hash: "",
        host: "home",
        hostname: "home.com",
        href: "http://home.com/",
        origin: "http://home.com",
        pathname: "/",
        port: "",
        protocol: "http:"
};

    
    
var dojoDom = module.exports = {
    /**
    // {url:"http://www.weg.de"}
    **/
    createDocument : function(input, callback){



   if(typeof input == "object" && input.url){
        
            var loc = url.parse(input.url);
            
            for(var i in loc){
                location[i] = loc[i];
            }
      
            //request remote content
            r[input.method || "get"](input, function(e,b,h){
                  callback(null,dojoDom.fromString(b.body));
            });
        }else{ 
            callback(null,dojoDom.fromString(input));
        }


    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
},
    fromString : function(html){
    
       jsdom.defaultDocumentFeatures = {
        //  FetchExternalResources   : ["script"],
        //  ProcessExternalResources : ["script"],
      //    FetchExternalResources   : [],
      //    ProcessExternalResources : [],
          "MutationEvents"           : '2.0',
          "QuerySelector"            : false
        }    
    
      window = jsdom.jsdom(null, null, {parser: HTML5}).createWindow(html);
  
      var parser = new HTML5.Parser({document: window.document});
      document = window.document;
      window.navigator = navigator;
    

   
    
   window = jsdom.jsdom(html, null, { parser: HTML5 } ).createWindow();
    
    if(typeof dojo != "undefined"){
       dojo.doc = document;
    }
   


    return document;
}}
